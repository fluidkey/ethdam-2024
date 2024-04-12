use dep::std;

fn main(hashed_message: pub [u8; 32], pub_key_x: [u8; 32], pub_key_y: [u8; 32], signature: [u8; 64]) {
    let valid_signature = std::ecdsa_secp256k1::verify_signature(pub_key_x, pub_key_y, signature, hashed_message);
    assert(valid_signature);
}

fn verifyTransaction() {
    // public input parameters are
    // * keystore root hash
    // * paths to root hash
    // private input parameters are
    // * public key (array) - for us 1 key is enough (no need of array)
    // * signature
    // * hash of data signed
    // what the code has to do
    // * verify the validity of signature
    // * check validity of the path to roothash from public key
}

// Checks if the secret and index provided by the user match the public hash of the smart account
fn verifySecret(secretIndex: [u8; 64], publicHash: pub [u8; 32]) {
    assert(std::hash::keccak256(secretIndex, 64) == publicHash);
}
