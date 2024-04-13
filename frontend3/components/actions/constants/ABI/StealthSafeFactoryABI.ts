export const StealthSafeFactoryABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "_verifier",
    "type": "address"
  }, {"internalType": "address", "name": "_keystore", "type": "address"}, {
    "internalType": "address",
    "name": "_hydrator",
    "type": "address"
  }], "stateMutability": "nonpayable", "type": "constructor"
}, {
  "inputs": [],
  "name": "HYDRATOR",
  "outputs": [{"internalType": "contract IHydrator", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "KEYSTORE",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "VERIFIER",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "bytes32", "name": "_stealth_init", "type": "bytes32"}],
  "name": "deploySafe",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "nonpayable",
  "type": "function"
}];
