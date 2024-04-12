// keccak hash a secret and an index using viem

import { concat, keccak256, toBytes, toHex } from 'viem';

export const generateStealthInit = (ks_index: number): {
  stealthSecret: Uint8Array;
  stealthInit: Uint8Array;
} => {
  const stealth_secret = keccak256('0x1234');
  const ks_index_hex = toHex(ks_index, {
    size: 32,
  });
  const stealth_init = keccak256(concat([stealth_secret, ks_index_hex]));
  return {
    stealthInit: toBytes(stealth_init),
    stealthSecret: toBytes(stealth_secret),
  }
}

const stealth_secret = keccak256('0x1234');
const ks_index = keccak256('0x5678');
console.log('stealth_secret', toBytes(stealth_secret));
console.log('ks_index', toBytes(ks_index));
console.log('stealth_init', toBytes(keccak256(concat([stealth_secret, ks_index]))));
