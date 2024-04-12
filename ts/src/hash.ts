// keccak hash a secret and an index using viem

import { concat, keccak256, toBytes } from 'viem';

const stealth_secret = keccak256('0x1234');
const ks_index = keccak256('0x5678');
console.log('stealth_secret', toBytes(stealth_secret));
console.log('ks_index', toBytes(ks_index));
console.log('stealth_init', toBytes(keccak256(concat([stealth_secret, ks_index]))));
