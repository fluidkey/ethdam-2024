import { hexToNumber, keccak256, toBytes, toHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import * as secp from '@noble/secp256k1';
import { getPublicKey, Point } from '@noble/secp256k1';

const toIntArray = (hexString: string): string[] => {
  const byteArray: string[] = [];
  for (let i = 0; i < hexString.length; i += 2) {
    byteArray.push(hexToNumber('0x' + hexString.substring(i, i + 2) as `0x${string}`).toString());
  }
  return byteArray;
};

const toIntArrayFromBytes = (bytesArray: Uint8Array): string[] => {
  const byteArray: string[] = [];
  for (let i = 0; i < bytesArray.length; i++) {
    byteArray.push(bytesArray[i].toString());
  }
  return byteArray;
};


const hash = (secretIndex: `0x${string}`): Uint8Array => {
  const keccak = keccak256(secretIndex)
  return toBytes(keccak);
};

const main = async () => {
  // const privateKey = generatePrivateKey();
  const privateKey = '0x368209fa1958a6bcb816f477d655e2dbe137d90f4f5b5b1eefc16ccdfc2cdcaa';
  const account = privateKeyToAccount(privateKey);
  const uncompressedHexPubKey = account.publicKey;
  const pubKeyCoords = uncompressedHexPubKey.slice(4); // '0x' + First byte just signals that it is uncompressed. TRASH!
  const halfLen = pubKeyCoords.length / 2; // should be 32;
  const x = '0x' + pubKeyCoords.slice(0, halfLen);
  const y = '0x' + pubKeyCoords.slice(halfLen, pubKeyCoords.length + 1);
  const message = 'this is the message to sing';
  const messageHashed = keccak256(toHex(message));
  const sign = await account.signMessage({
    message: {
      raw: messageHashed,
    },
  });

  // work directly with noble to prove that x and y are the same
  const pubKey = getPublicKey(privateKey.slice(2), false);
  // console.log('secpXPubKeyCoord', Point.fromHex(pubKey).x.toString(16));
  // console.log('secpYPubKeyCoord', Point.fromHex(pubKey).y.toString(16));

  // now prove noble signature
  const signWithNoble = await secp.sign(messageHashed.slice(2), privateKey.slice(2), {
    recovered: false,
    canonical: true,
    der: false,
  });

  const secret = keccak256('0x1234');
  const index = keccak256('0x5678');
  const secretIndex = `0x${secret.slice(2)}${index.slice(2)}` as `0x${string}`;
  console.log('SecretIndex', toBytes(secretIndex));

  // console.log('signWithNoble', signWithNoble.length, signWithNoble);

  // console.log('pubkey', uncompressedHexPubKey);
  // console.log('pubkeyX', x);
  // console.log('pubkeyY', y);
  // console.log('message hash', messageHashed);
  // console.log('sign', sign);
  // console.log('noir_hashed_message', JSON.stringify(toIntArray(messageHashed.slice(2))));
  console.log('noir_pub_key_x', JSON.stringify(toIntArray(x.slice(2))));
  console.log('noir_pub_key_y', JSON.stringify(toIntArray(y.slice(2))));
  const signature_array = toIntArray(sign.slice(2));
  signature_array.pop(); // remove the 'v' from the signature (noir accepts 64-bit input only)
  const noble_signature_array = toIntArrayFromBytes(signWithNoble);
  console.log('noble_signature_array', noble_signature_array.length, JSON.stringify(noble_signature_array));
};

main()
  .then()
  .catch(e => console.log(e));