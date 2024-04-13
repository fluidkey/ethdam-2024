import { toHex } from "viem";
import { generateKeysAndSignature } from "./generateSignature";

async function main () {
  const keyAndSign = await generateKeysAndSignature('this is the message to sign');
  console.log(keyAndSign);
  console.log('privateKeyHex: ', toHex(keyAndSign.privateKey));
  console.log('pubKeyXHex: ', toHex(keyAndSign.pubKeyX));
  console.log('pubKeyYHex: ', toHex(keyAndSign.pubKeyY));
  console.log('messageHashedHex: ', toHex(keyAndSign.messageHashed));
  console.log('signHex: ', toHex(keyAndSign.sign));
}

main();