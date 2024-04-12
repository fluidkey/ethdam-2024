use dep::std;

/**
*   @param hashed_message - the hashed message that is signed
*   @param pub_key_x - x vector of the public key connected to the account that signed
*   @param pub_key_y - y vector of the public key connected to the account that signed
*   @param signature - the signature of the hashed_message
*   @param stealth_secret - the stealth_secret
*   @param ks_index - the ks_index
*   @param stealth_init - the hashed used to init the stealth account
*   @param proofs - array with the proofs for the merkle tree. It's an array of array, with max 3 proofs
**/
fn main(
    hashed_message: pub [u8; 32], pub_key_x: [u8; 32], pub_key_y: [u8; 32], signature: [u8; 64],
    stealth_secret: [u8; 32], ks_index: [u8; 32], stealth_init: pub [u8; 32],
    proofs: [[u8; 32]; 3], merkle_state_root: pub [u8; 32]
) {
    // verify signature
    let valid_signature = std::ecdsa_secp256k1::verify_signature(pub_key_x, pub_key_y, signature, hashed_message);
    assert(valid_signature);

    // verify that the stealth_init is obtained from ks_index and stealth_secret
    assert(std::hash::keccak256(concat_uint256_array(stealth_secret, ks_index), 64) == stealth_init);

    // verify that from publick_key + index we get up to root following the path
    let pub_key_hash = std::hash::keccak256(concat_uint256_array(pub_key_x, pub_key_y), 64);
    let leaf = std::hash::keccak256(concat_uint256_array(pub_key_hash, ks_index), 64);
    assert(eval_merkle_root_4_levels(leaf, proofs) == merkle_state_root);
}

// concat 2 keccak256 into a one u512 value
unconstrained fn concat_uint256_array(arr1: [u8; 32], arr2: [u8; 32]) -> [u8; 64] {
    let mut out: [u8; 64] = [0; 64];
    for i in 0..32 {
        out[i] = arr1[i];
    }
    for i in 0..32 {
        out[32 + i] = arr2[i];
    }
    out
}

// concat 2 keccak256 into a one u512 value
unconstrained fn eval_merkle_root_4_levels(leaf: [u8; 32], proofs: [[u8; 32]; 3]) -> [u8; 32] {
    let mut current_step: [u8; 32] = leaf;
    // loop over the proofs
    for p in 0..3 {
        current_step = std::hash::keccak256(concat_uint256_array(current_step, proofs[p]), 64);
    }
    current_step
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