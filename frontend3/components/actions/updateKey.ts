import { createViemPublicClient, generateLeaves, generateMerkleTree } from '@/components/actions/_common';
import { KEYSTORE } from '@/components/actions/constants/contractAddress';
import { KeystoreABI } from '@/components/actions/constants/ABI/KeystoreABI';
import { privateKeyToAccount } from 'viem/accounts';
import * as secp from '@noble/secp256k1';
import { concat, encodeFunctionData, keccak256, toHex } from 'viem';
import axios from 'axios';
import { RELAYER } from '@/components/actions/constants/backend';

export const updateKey = async (
  oldPrivateKey: `0x${string}`,
  newPrivateKey: `0x${string}`,
  ksIndex: number,
): Promise<void> => {
  const client = createViemPublicClient();
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
  const leafPathProofs = merkleTree.getProof(merkleTree.getLeaf(ksIndex));
  const proofs = leafPathProofs.map(
    p => '0x' + p.data.toString('hex')
  );
  const proofPosition = leafPathProofs.map(p =>
    ('0x' + (p.position === 'left' ? 0 : 1))
  );

  // lead new account to extract publicKey
  const oldAccount = privateKeyToAccount(oldPrivateKey);
  const oldPublicKey = oldAccount.publicKey;
  const OldPubKeyX = '0x' + oldPublicKey.slice(4).slice(0,64) as `0x${string}`;
  const OldPubKeyY = '0x' + oldPublicKey.slice(4).slice(64,128) as `0x${string}`;


  // lead new account to extract publicKey
  const newAccount = privateKeyToAccount(newPrivateKey);
  const newPublicKey = newAccount.publicKey;
  const newPubKeyX = '0x' + newPublicKey.slice(4).slice(0,64) as `0x${string}`;
  const newPubKeyY = '0x' + newPublicKey.slice(4).slice(64,128) as `0x${string}`;

  // prepare and sign the confrmation message
  const hashMessage = keccak256(concat([toHex(ksIndex, {size: 32}), newPubKeyX, newPubKeyY]));
  const [signWithNoble, recoverByte] = await secp.sign(hashMessage.slice(2), newPrivateKey.slice(2), {
    recovered: true,
    canonical: true,
    der: false,
  });
  const r = toHex(signWithNoble.slice(0,32), {size: 32});
  const s = toHex(signWithNoble.slice(32,64), {size: 32});
  const v = recoverByte + 27;

  // prepare and relay transaction
  const contractCallData = encodeFunctionData({
    abi: KeystoreABI,
    functionName: 'updateKey',
    args: [
      ksIndex,
      OldPubKeyX,
      OldPubKeyY,
      newPubKeyX,
      newPubKeyY,
      proofs,
      proofPosition,
      v,
      r,
      s
    ]
  });

  // do the call to the backend
  await axios.post(RELAYER, {
    txData: contractCallData,
    to: KEYSTORE
  });
}
