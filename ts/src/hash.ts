// keccak hash a secret and an index using viem

import { keccak256, toBytes } from 'viem';

export function hash(secretIndex: `0x${string}`): Uint8Array {
  const keccak = keccak256(secretIndex)
  return toBytes(keccak);
}

const secret = keccak256('0x1234');
const index = keccak256('0x5678');
const secretIndex = `0x${secret.slice(2)}${index.slice(2)}` as `0x${string}`;
console.log(toBytes(secretIndex))
console.log(hash(secretIndex))
