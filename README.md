# ethdam-2024

With **Stealth Keystore** we set out to showcase that keystores will not only improve cross-chain smart account UX and security, but also enable much better privacy defaults on public EVM chains and give the full power of stealth addresses to smart accounts.

## User Benefits:

+ register their keys in our onchain keystore
+ deploy an unlimited amount of smart accounts that are all controlled by these registered keys
+ transact from these smart accounts privately, there is no public connection to the registered keys or to any of the other smart accounts controlled by the same user
+ rotate their keys in the keystore and instantly control all of their stealth smart accounts with the new keys


## Our Submission

To build **Stealth Keystore** we used the following stacks:

+ ZK proofs using Noir
+ Safe smart accounts
+ Solidity contracts (keystore, smart account owner, zk verifier) deployed on Base
+ Next.js frontend