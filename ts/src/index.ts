import { generateKeysAndSignature, uint8ToNoirProve } from './generateSignature';
import { generateStealthInit } from './hash';
import { generateLeaf, generateMerkleTree, generateZeroLeaves } from './merkleTreeV2';
import { concat, fromHex, keccak256, pad, toBytes, toHex } from 'viem';

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
  console.log('proofs_position =', merkleTree.getProof(merkleTree.getLeaf(0)).map(p =>
    (p.position === 'left' ? '0' : '1')
  ));

  console.log('--------- Data to add on a SC test ---------');
  let leaves0 = generateZeroLeaves();
  const merkleTree0 = generateMerkleTree(leaves0);
  console.log('merkle_state_root_original =', '0x' + merkleTree0.getRoot().toString('hex'));
  const current_leaf_0 = merkleTree0.getLeaf(0).toString('hex');
  console.log('current_leaf_0', current_leaf_0);
  const proofs0 = merkleTree0.getProof(merkleTree0.getLeaf(0)).map(p =>
    '0x' + p.data.toString('hex'));
  console.log('proofs',proofs0);
  console.log('first-computed-proof', keccak256(concat(['0x' + current_leaf_0 as `0x${string}`, proofs0[0] as `0x${string}`])));
  console.log('proofs_position', merkleTree.getProof(merkleTree.getLeaf(0)).map(p =>
    ('0x' + (p.position === 'left' ? '00' : '01'))
  ));
  console.log('pub_key_x =', toHex(keyAndSign.pubKeyX));
  console.log('pub_key_y =', toHex(keyAndSign.pubKeyY));
  console.log('stealth_init =', toHex(stealthInit.stealthInit));
  console.log('hashed_message =', toHex(keyAndSign.messageHashed));
  console.log('signature =', toHex(keyAndSign.sign));
})();
