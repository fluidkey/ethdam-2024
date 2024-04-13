# ETH Dam 2024 Backend Docker Prover

This microservice is responsible for using the parameters provided by the user to verify the proof using `nargo` ([read mode](https://noir-lang.org/)). It uses the circuit we created using rust.

It has a AWS Fargate Task that is always running and calls the command `nargo prove` to verify the parameters.

The endpoint exposed is `POST /zk-proof` with the following body: 

```json
{
  "hashed_message": number[], // the hashed message that is signed
  "pub_key_x": number[], // x vector of the public key connected to the account that signed
  "pub_key_y": number[], // y vector of the public key connected to the account that signed
  "signature": number[], // the signature of the hashed_message
  "stealth_init": number[], // the hashed used to init the stealth account
  "stealth_secret": number[], // the stealth_secret
  "ks_index": number[], // the ks_index
  "merkle_state_root": number[], // the current merkle_state_root
  "proofs": number[][], // array with the proofs for the merkle tree. It's an array of array, with max 3 proofs
  "proofs_position": number[] // position according to the relative for the sibiling 
}
```

We had to create this microservice because we had problems using `@noir-lang/noir_js` and `@noir-lang/backend_barretenberg` for the client side proof verification.

## Deployment

Since this microservice has been developed using `projen`, to deploy it you have to use the following command:

```bash
npx projen deploy --profile {aws_profile_name}
```

After you deploy it, you will find the AWS Fargate Task public URL in the AWS Console.