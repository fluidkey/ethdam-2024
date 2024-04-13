import * as secp from '@noble/secp256k1';
import { Point, getPublicKey } from '@noble/secp256k1';
import { keccak256, toBytes, toHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export const uint8ToNoirProve = (uint8: Uint8Array): string => {
  return `[${uint8.join(',')}]`;
}

export const generateKeysAndSignature = async(
  message: string = 'this is the message to sign'
): Promise<{
  privateKey: Uint8Array;
  pubKeyX: Uint8Array;
  pubKeyY: Uint8Array;
  messageHashed: Uint8Array;
  sign: Uint8Array;
}> => {
  // const privateKey = generatePrivateKey();
  const privateKey = '0x368209fa1958a6bcb816f477d655e2dbe137d90f4f5b5b1eefc16ccdfc2cdcaa';
  const account = privateKeyToAccount(privateKey);
  const uncompressedHexPubKey = account.publicKey;
  const pubKeyCoords = uncompressedHexPubKey.slice(4); // '0x' + First byte just signals that it is uncompressed. TRASH!
  const halfLen = pubKeyCoords.length / 2; // should be 32;
  const messageHashed = keccak256(toHex(message));

  // work directly with noble to prove that x and y are the same
  const pubKey = getPublicKey(privateKey.slice(2), false);

  // now prove noble signature
  const signWithNoble = await secp.sign(messageHashed.slice(2), privateKey.slice(2), {
    recovered: false,
    canonical: true,
    der: false,
  });

  return {
    privateKey: toBytes(privateKey),
    pubKeyX: toBytes(Point.fromHex(pubKey).x),
    pubKeyY: toBytes(Point.fromHex(pubKey).y),
    messageHashed: toBytes(messageHashed),
    sign: signWithNoble,
  }
};
