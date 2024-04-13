import { base } from 'viem/chains';
import { concat, createPublicClient, http, keccak256, PublicClient, toHex } from 'viem';
import { MerkleTree } from 'merkletreejs';

export const createViemPublicClient = () => {
  const publicClient = createPublicClient({
    chain: base,
    transport: http()
  });
  return publicClient;
}

/**
 * Generate a merlke tree starting from leaves
 * @param leaves
 */
export const generateMerkleTree = (leaves: `0x${string}`[]): MerkleTree => {
  const tree = new MerkleTree(
    leaves,
    keccak256,
    {
      hashLeaves: true,
    },
  );
  return tree;
}

/**
 * Replace the 0 leaves read from chain to actual keccak256(0x00, 0x00) - this is the start for the merkle tree
 * @param currentLeaves
 */
export const replaceZeroLeaves = (currentLeaves: `0x${string}`[]): `0x${string}`[] => {
  const zeroHex = keccak256(concat([new Uint8Array(32), new Uint8Array(32)]));
  return currentLeaves.map(l => l === toHex(0, { size: 32 }) ? zeroHex : l);
}

/**
 * Receive the list of leaves representing the hash of the public key, and returnes the real list of leaves as
 * keccak(pubKeyHash, index) to start computing the merkle tree
 * @param leavePubKeyHash
 */
export const generateLeaves = (leavePubKeyHash: `0x${string}`[]): `0x${string}`[] => {
  return leavePubKeyHash.map((lpkh, pos) => {
    const leafIndex = toHex(pos, { size: 32 });
    return keccak256(concat([lpkh, leafIndex])) as `0x${string}`;
  })
}
