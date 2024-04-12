import { MerkleTree } from 'merkletreejs';
import { concat, keccak256, toHex } from 'viem';

const main = async () => {
  let leaves: `0x${string}`[] = []
  for (let i = 0; i < 8; i++) {
    // leaf index is a 32 byte hex string padded with 0s and representing i
    const leafIndex = toHex(i, { size: 32 });
    const leafPublicKeyHash = toHex(0, { size: 32 });
    leaves.push(keccak256(concat([leafPublicKeyHash, leafIndex])) as `0x${string}`);
  }
 
  console.log('Leaves', leaves);
  const tree = new MerkleTree(
    leaves,
    keccak256,
    {
      hashLeaves: true,
    },
  );
  const root = tree.getRoot().toString('hex');
  tree.print();
  console.log('root', root, tree.getDepth());
};

main();