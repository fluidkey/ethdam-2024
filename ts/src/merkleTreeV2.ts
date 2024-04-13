import { MerkleTree } from 'merkletreejs';
import { concat, keccak256, toHex } from 'viem';

const NUM_LEAVES = 64;

export const generateZeroLeaves = (): `0x${string}`[] => {
  let leaves: `0x${string}`[] = []
  for (let i = 0; i < NUM_LEAVES; i++) {
    const leaf = generateLeaf(i, new Uint8Array(32), new Uint8Array(32));
    leaves.push(leaf);
  }
  return leaves;
}

export const generateLeaf = (index: number, pubKeyX: Uint8Array, pubKeyY: Uint8Array): `0x${string}` => {
  const leafIndex = toHex(index, { size: 32 });
  const leafPublicKeyHash = keccak256(concat([pubKeyX, pubKeyY]));
  return keccak256(concat([leafPublicKeyHash, leafIndex])) as `0x${string}`;
}

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
