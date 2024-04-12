import { MerkleTree } from 'merkletreejs';
import { keccak256, toBytes } from 'viem';

const main = async () => {
  // const leaves = ['0', '1', '2', '3', '4', '5', '6', '7'].map(x => keccak256(toBytes(x)));
  const leaves = ['0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00'].map(x => keccak256(toBytes(x)));
  console.log('Leaves', leaves);
  const tree = new MerkleTree(
    leaves,
    keccak256,
    {
      hashLeaves: true,
      complete: true,
    },
  );
  const root = tree.getRoot().toString('hex');
  tree.print();
  console.log('root', root, tree.getDepth());
};

main();