import { encodePacked, keccak256, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { generateKeysAndSignature } from "./generateSignature";
import { generateMerkleTree, generateZeroLeaves } from "./merkleTreeV2";
import * as secp from '@noble/secp256k1';

async function main () {
  const zeroLeaves = generateZeroLeaves();
  generateMerkleTree(zeroLeaves).print();
  console.log('zeroLeaves: ', zeroLeaves);
  const leaves: `0x${string}`[] = [
    '0x17286ff09e47570ad29ba99f94161481b675fb6f4dd714814464bc9f511a3760',
    '0x694e626947937ef7105b045f0c147746648692e2684ec48f25b8fca2f700c625',
    '0x6546e81ae8f80519db61cf3e0928358d2b97cc90baeefcf83c01cd42830c240e',
    '0x0445fad5436550d8bab264e2a5d457210ce9e8b92d4d8e8c41d1a856ac602f2b',
    '0x357ce69fd3bd3ee52b5ea6f5f7ca34767cab75487fd3a9d1540b0184c70ba985',
    '0xc9d254ab29de8709e9f2b75e9d47f1238c8cb126ac8268aa0af66afb6268aa5c',
    '0x13e794194dfd82d5047e2cff25b0aa3f2bcbb49344c2f2350b4e6df6ec6d0c27',
    '0x82f19a81d67ef638e64ca94fa068e340f6e12c574ca574249ccf3e75fe94e397'
  ];
  generateMerkleTree(leaves).print();
  const encodedMessage = keccak256(encodePacked(
    ['uint256', 'bytes32', 'bytes32'],
    [0n, '0x6fc4e292df09c8fe0e4ada2e390bd1736ff287e9bbd4e013275676490910b19a', '0xcc91b473d1d747edcc6455265f693c21f4605c982b1480a03f20b2358b059eca']
  ));
  console.log('encodedMessage: ', encodedMessage);
  const keyAndSign = await generateKeysAndSignature(encodedMessage);
  console.log(keyAndSign);
  console.log('privateKeyHex: ', toHex(keyAndSign.privateKey));
  console.log('pubKeyXHex: ', toHex(keyAndSign.pubKeyX));
  console.log('pubKeyYHex: ', toHex(keyAndSign.pubKeyY));
  console.log('messageHashedHex: ', toHex(keyAndSign.messageHashed));
  console.log('signHex: ', toHex(keyAndSign.sign));
  const account = privateKeyToAccount(toHex(keyAndSign.privateKey));
  const signature = await account.signMessage({
    message: { raw: encodedMessage },
  });
  const [signWithNoble, recovered] = await secp.sign(encodedMessage.slice(2), keyAndSign.privateKey, {
    recovered: true,
    der: false,
  });
  console.log('r', toHex(signWithNoble.slice(0,32)));
  console.log('s', toHex(signWithNoble.slice(32,64)));
  console.log('v: ', recovered + 27);
}

main();
