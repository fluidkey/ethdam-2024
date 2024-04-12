import { generateKeysAndSignature, uint8ToNoirProve } from './generateSignature';
import { generateStealthInit } from './hash';

// this is the main script to generate all the details needed to run a full prove + verification of the zk circuit
void (async () => {
  const keyAndSign = await generateKeysAndSignature();
  console.log('hashed_message =', uint8ToNoirProve(keyAndSign.messageHashed));
  console.log('pub_key_x =', uint8ToNoirProve(keyAndSign.pubKeyX));
  console.log('pub_key_y =', uint8ToNoirProve(keyAndSign.pubKeyY));
  console.log('signature =', uint8ToNoirProve(keyAndSign.sign));

  const stealthInit = generateStealthInit(0);
  console.log('stealth_init', uint8ToNoirProve(stealthInit.stealthInit));
  console.log('stealth_secret', uint8ToNoirProve(stealthInit.stealthSecret));
})();
