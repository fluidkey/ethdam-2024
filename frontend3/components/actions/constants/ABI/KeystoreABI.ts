export const KeystoreABI = [{
  "inputs": [{"internalType": "bytes32", "name": "_root", "type": "bytes32"}],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "inputs": [{"internalType": "bytes32[6]", "name": "proofs", "type": "bytes32[6]"}, {
    "internalType": "uint8[6]",
    "name": "positions",
    "type": "uint8[6]"
  }, {"internalType": "bytes32", "name": "newPubKeyX", "type": "bytes32"}, {
    "internalType": "bytes32",
    "name": "newPubKeyY",
    "type": "bytes32"
  }],
  "name": "addKey",
  "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}, {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}, {
    "internalType": "bytes32",
    "name": "pubKeyX",
    "type": "bytes32"
  }, {"internalType": "bytes32", "name": "pubKeyY", "type": "bytes32"}],
  "name": "computeLeaf",
  "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "bytes32", "name": "leaf", "type": "bytes32"}, {
    "internalType": "bytes32[6]",
    "name": "proofs",
    "type": "bytes32[6]"
  }, {"internalType": "uint8[6]", "name": "positions", "type": "uint8[6]"}],
  "name": "computeRoot",
  "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
  "stateMutability": "pure",
  "type": "function"
}, {
  "inputs": [],
  "name": "getAllLeaves",
  "outputs": [{"internalType": "bytes32[]", "name": "", "type": "bytes32[]"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
  "name": "getLeaf",
  "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "name": "leaves",
  "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "nextFreeSlot",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "bytes32", "name": "pubKeyX", "type": "bytes32"}, {
    "internalType": "bytes32",
    "name": "pubKeyY",
    "type": "bytes32"
  }],
  "name": "publicKeyToAddress",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "pure",
  "type": "function"
}, {
  "inputs": [],
  "name": "root",
  "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}, {
    "internalType": "bytes32",
    "name": "currentPubKeyX",
    "type": "bytes32"
  }, {"internalType": "bytes32", "name": "currentPubKeyY", "type": "bytes32"}, {
    "internalType": "bytes32",
    "name": "newPubKeyX",
    "type": "bytes32"
  }, {"internalType": "bytes32", "name": "newPubKeyY", "type": "bytes32"}, {
    "internalType": "bytes32[6]",
    "name": "proofs",
    "type": "bytes32[6]"
  }, {"internalType": "uint8[6]", "name": "positions", "type": "uint8[6]"}, {
    "internalType": "uint8",
    "name": "v",
    "type": "uint8"
  }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
    "internalType": "bytes32",
    "name": "s",
    "type": "bytes32"
  }],
  "name": "updateKey",
  "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}, {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "bytes32", "name": "leaf", "type": "bytes32"}, {
    "internalType": "bytes32[6]",
    "name": "proofs",
    "type": "bytes32[6]"
  }, {"internalType": "uint8[6]", "name": "positions", "type": "uint8[6]"}],
  "name": "verify",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "view",
  "type": "function"
}];
