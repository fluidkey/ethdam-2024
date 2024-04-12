import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { keccak256, toBytes } from "viem";

const values = [
  ["0x00", "0x00"],
  ["0x01", "0x00"],
  ["0x02", "0x00"],
  ["0x03", "0x00"],
  ["0x04", "0x00"],
  ["0x05", "0x00"],
  ["0x06", "0x00"],
  ["0x07", "0x00"],
];

const tree = StandardMerkleTree.of([[keccak256(toBytes("0x00"))], [keccak256(toBytes("0x00"))], [keccak256(toBytes("0x00"))], [keccak256(toBytes("0x00"))], [keccak256(toBytes("0x00"))], [keccak256(toBytes("0x00"))], [keccak256(toBytes("0x00"))], [keccak256(toBytes("0x00"))]],["bytes"]);

console.log(tree.root);
console.log(tree.dump());