import { generateKeysAndSignature, uint8ToNoirProve } from './generateSignature';
import { generateStealthInit } from './hash';
import { generateLeaf, generateMerkleTree, generateZeroLeaves } from './merkleTreeV2';
import { pad, toBytes, toHex } from 'viem';

// this is the main script to generate all the details needed to run a full prove + verification of the zk circuit
void (async () => {
  const keyAndSign = await generateKeysAndSignature();
  console.log('hashed_message =', uint8ToNoirProve(keyAndSign.messageHashed));
  console.log('pub_key_x =', uint8ToNoirProve(keyAndSign.pubKeyX));
  console.log('pub_key_y =', uint8ToNoirProve(keyAndSign.pubKeyY));
  console.log('signature =', uint8ToNoirProve(keyAndSign.sign));

  const stealthInit = generateStealthInit(0);
  console.log('stealth_init =', uint8ToNoirProve(stealthInit.stealthInit));
  console.log('stealth_secret =', uint8ToNoirProve(stealthInit.stealthSecret));
  console.log('ks_index =', uint8ToNoirProve(pad(toBytes(0), { size: 32 })));

  let leaves = generateZeroLeaves();
  leaves[0] = generateLeaf(0, keyAndSign.pubKeyX, keyAndSign.pubKeyY);
  const merkleTree = generateMerkleTree(leaves);
  console.log('merkle_state_root =', uint8ToNoirProve(toBytes('0x' + merkleTree.getRoot().toString('hex'))));
  console.log('proofs =', merkleTree.getProof(merkleTree.getLeaf(0)).map(p =>
    uint8ToNoirProve(toBytes('0x' + p.data.toString('hex')))
  ));

  console.log('--------- Data to add on a SC test ---------');
  let leaves0 = generateZeroLeaves();
  const merkleTree0 = generateMerkleTree(leaves0);
  console.log('proofs', merkleTree0.getProof(merkleTree0.getLeaf(0)).map(p =>
    '0x' + p.data.toString('hex')));
  console.log('pub_key_x =', toHex(keyAndSign.pubKeyX));
  console.log('pub_key_y =', toHex(keyAndSign.pubKeyY));
  console.log('stealth_init =', toHex(stealthInit.stealthInit));
})();
