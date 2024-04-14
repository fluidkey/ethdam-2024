import { concat, fromHex, hashTypedData, keccak256, pad, toBytes, toHex } from 'viem';
import { SafeABI } from '@/components/actions/constants/ABI/SafeABI';
import { createViemPublicClient, generateLeaves, generateMerkleTree } from '@/components/actions/_common';
import { KEYSTORE } from '@/components/actions/constants/contractAddress';
import { KeystoreABI } from '@/components/actions/constants/ABI/KeystoreABI';
import { privateKeyToAccount } from 'viem/accounts';
import * as secp from '@noble/secp256k1';
import axios from 'axios';
import { ZK_PROOF_GENERATOR } from '@/components/actions/constants/backend';

/**
 * Function to move ETH
 */
export const moveEth = async (params: {
  fromSafeAddress: `0x${string}`,
  amount: bigint,
  to: `0x${string}`,
  privateKey: `0x${string}`,
  randomSecret: `0x${string}`,
  keyStoreIndex: number,
}) => {

  const {fromSafeAddress, amount, to, privateKey, randomSecret, keyStoreIndex} = params;

  const client = createViemPublicClient();

  // get next nonce of safe
  const nextNonce = await client.readContract({
    address: params.fromSafeAddress,
    abi: SafeABI,
    functionName: 'nonce'
  }) as bigint;

  // prepare the hash of the txData for safe
  const hashMessage = prepareHashMessage({
    safeAddress: fromSafeAddress,
    nonce: nextNonce,
    value: amount,
    data: '0x00',
    to: to,
  });

  // get the pub key
  const newAccount = privateKeyToAccount(privateKey);
  const publicKey = newAccount.publicKey;
  const pubKeyX = '0x' + publicKey.slice(4).slice(0,64) as `0x${string}`;
  const pubKeyY = '0x' + publicKey.slice(4).slice(64,128) as `0x${string}`;

  // now prove noble signature
  const signWithNoble = await secp.sign(hashMessage.slice(2), privateKey.slice(2), {
    recovered: false,
    canonical: true,
    der: false,
  });

  // prepare the stelathInit
  const stealthInit = keccak256(concat([randomSecret, toHex(keyStoreIndex, {size: 32})]));

  // read merkle state root
  const root = await client.readContract({
    address: KEYSTORE,
    abi: KeystoreABI,
    functionName: 'root'
  }) as `0x${string}`;

  // read leaves
  const onChainLeaves = await client.readContract({
    address: KEYSTORE,
    abi: KeystoreABI,
    functionName: 'getAllLeaves'
  }) as `0x${string}`[];
  // replace the 0x00 on chain leaves with the correct hash
  const leaves = generateLeaves(onChainLeaves);
  // generate merkle tree
  const merkleTree = generateMerkleTree(leaves);
  const leafPathProofs = merkleTree.getProof(merkleTree.getLeaf(keyStoreIndex));
  const proofs = leafPathProofs.map(
    p => '0x' + p.data.toString('hex')
  );
  const proofPosition = leafPathProofs.map(p =>
    ((p.position === 'left' ? 0 : 1))
  );

  // prepare the zkProof data
  const zkProofData = {
    "hashed_message": Array.from(toBytes(hashMessage)),
    "pub_key_x": Array.from(toBytes(pubKeyX)),
    "pub_key_y": Array.from(toBytes(pubKeyY)),
    "signature": Array.from(signWithNoble),
    "stealth_init": Array.from(toBytes(pad(stealthInit, {size: 32}))),
    "stealth_secret": Array.from(toBytes(pad(randomSecret, {size: 32}))),
    "ks_index": Array.from(toBytes(toHex(keyStoreIndex, {size: 32}))),
    "merkle_state_root": Array.from(toBytes(root, {size: 32})),
    "proofs": proofs.map(p => Array.from(toBytes(p, {size: 32}))),
    "proofs_position": proofPosition
  };

  // require the proof
  const zkProofResponse = await axios.post(ZK_PROOF_GENERATOR, zkProofData);

  const zkProof = zkProofResponse.data.proof;
  console.log('proof', zkProof);

  // get the safe owner
  const owners = await client.readContract({
    address: params.fromSafeAddress,
    abi: SafeABI,
    functionName: 'getOwners'
  }) as `0x${string}`[];
  const owner = owners[0];

  // prepare the signature data for safe - like https://docs.safe.global/advanced/smart-account-signatures#contract-signature-eip-1271
  const signature = concat([
    pad(owner, {size: 32}),
    toHex(65, {size: 32}),
    '0x0',
    toHex(toBytes(zkProof).length, {size: 32}),
    zkProof
  ]);
  console.log('signature', signature);

  // encode the parameters for the function and call the relayer

}


const prepareHashMessage = (params: {
  to: `0x${string}`,
  value: bigint,
  nonce: bigint,
  data: `0x${string}`,
  safeAddress: `0x${string}`,
}): `0x${string}` => {
  const {to, value, nonce, data, safeAddress} = params;

  // The EIP712 domain separator
  const domain: any = {
    chainId: 8453,
    verifyingContract: safeAddress,
  };

  // The EIP712 type definitions
  const types = {
    SafeTx: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'operation', type: 'uint8' },
      { name: 'safeTxGas', type: 'uint256' },
      { name: 'baseGas', type: 'uint256' },
      { name: 'gasPrice', type: 'uint256' },
      { name: 'gasToken', type: 'address' },
      { name: 'refundReceiver', type: 'address' },
      { name: 'nonce', type: 'uint256' },
    ],
  };

  // The EIP712 typed message containing the Safe transaction
  const typedMessage = {
    to: to,
    value: value,
    data: '0x00',
    operation: '0',
    baseGas: 0,
    gasPrice: 0,
    gasToken: '0x0000000000000000000000000000000000000000',
    refundReceiver: '0x0000000000000000000000000000000000000000',
    nonce: nonce,
    safeTxGas: 0,
  };

  return hashTypedData({
    types,
    message: typedMessage,
    domain,
    primaryType: 'SafeTx',
  });
}

