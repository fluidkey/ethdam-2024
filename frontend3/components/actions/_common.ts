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
 * Receive the list of leaves representing on chain, and returnes the real list of leaves as
 * keccak(pubKeyHash, index) to start computing the merkle tree. If the onChainLeaves is 0x00, means we have
 * to compute also the pubKeyHash, otherwise it's already ready to be returned. On chian leaves are already keccak(pubKeyHash, index)
 * @param onChainLeaves
 */
export const generateLeaves = (onChainLeaves: `0x${string}`[]): `0x${string}`[] => {
  return onChainLeaves.map((lonc, pos) => {
    if (lonc === toHex(0, { size: 32 })) {
      const lpk = keccak256(concat([new Uint8Array(32), new Uint8Array(32)]));
      const leafIndex = toHex(pos, { size: 32 });
      return keccak256(concat([lpk, leafIndex])) as `0x${string}`
    } else return lonc;
  });
}
