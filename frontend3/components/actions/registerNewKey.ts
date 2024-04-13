import { KeystoreABI } from '@/components/actions/constants/KeystoreABI';
import { createViemPublicClient, generateLeaves, generateMerkleTree } from '@/components/actions/common';
import { KEYSTORE } from '@/components/actions/constants/contractAddress';
import { concat, encodeFunctionData, keccak256, toHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import axios from 'axios';
import { RELAYER } from '@/components/actions/constants/backend';

/**
 * Register the user key inside the Keystore contract
 * @param privateKey
 */
export const registerNewKey = async (privateKey: `0x${string}`) => {
  const client = createViemPublicClient();
  // read next available position
  const nextFreeSlot = await client.readContract({
    address: KEYSTORE,
    abi: KeystoreABI,
    functionName: 'nextFreeSlot'
  }) as number;
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
  merkleTree.print();
  const leafPathProofs = merkleTree.getProof(merkleTree.getLeaf(nextFreeSlot));
  const proofs = leafPathProofs.map(
    p => '0x' + p.data.toString('hex')
  );
  const proofPosition = leafPathProofs.map(p =>
    ('0x' + (p.position === 'left' ? 0 : 1))
  );
  // lead new account to extract publicKey
  const newAccount = privateKeyToAccount(privateKey);
  const publicKey = newAccount.publicKey;
  const pubKeyX = '0x' + publicKey.slice(4).slice(0,64) as `0x${string}`;
  const pubKeyY = '0x' + publicKey.slice(4).slice(64,128) as `0x${string}`;

  // data to update the root
  const contractCallData = encodeFunctionData({
    abi: KeystoreABI,
    functionName: 'addKey',
    args: [
      proofs,
      proofPosition,
      pubKeyX,
      pubKeyY
    ]
  });

  // do the call to the backend
  await axios.post(RELAYER, {
    txData: contractCallData,
    to: KEYSTORE
  });
}
