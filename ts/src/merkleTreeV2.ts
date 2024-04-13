import { MerkleTree } from 'merkletreejs';
import { concat, keccak256, toHex } from 'viem';

export const generateZeroLeaves = (): `0x${string}`[] => {
  let leaves: `0x${string}`[] = []
  for (let i = 0; i < 8; i++) {
    const leaf = generateLeaf(i, new Uint8Array(32), new Uint8Array(32));
    console.log('leaf: ', leaf);
    leaves.push(leaf);
  }
  return leaves;
}

export const generateLeaf = (index: number, pubKeyX: Uint8Array, pubKeyY: Uint8Array): `0x${string}` => {
  const leafIndex = toHex(index, { size: 32 });
  console.log('leafIndex: ', leafIndex);
  const leafPublicKeyHash = keccak256(concat([pubKeyX, pubKeyY]));
  console.log('leafPublicKeyHash: ', leafPublicKeyHash);
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
