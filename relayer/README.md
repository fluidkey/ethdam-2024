# ETH Dam 2024 Backend Relayer

This microservice is responsible for publishing on-chain the `txData` received from our dApp.

It has an AWS Lambda Function with a function URL configured to be called using the HTTP POST method and with the following body:

```json
{
  "txData": "0x${string}", // the txData signed by the user using our dApp
  "to": "0x...." // where the txData needs to be published
}
```

The response of the endpoint is the following:

```json
{
  "txHash": "0x...", // the txHash published on-chain
  "stealthSafeAddress": "0x" // stealth safe address, if any has been created 
}
```
# Development

To develop this microservice, you need to create an `.env` file with the following parameters:

```env
BASE_HTTPS_URL={base_https_url} // the https rpc url to publish txs on-chain
BASE_WSS_URL={base_wss_url} // the websocket url to publish txs on-chain
RELAYER_PRIVATE_KEY={relayer_private_key} // the relayer private key
```

Now you are ready to develop / deploy the microservice.

## Deployment

Since this microservice has been developed using `projen`, to deploy it you have to use the following command:

```bash
npx projen deploy --profile {aws_profile_name}
```

After you deploy it, you will find the AWS Lambda Function URL in the `exports` of the AWS CDK template.