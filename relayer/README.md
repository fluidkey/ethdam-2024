# ETH Dam 2024 Backend Relayer

This microservice is responsible for publishing on-chain the `txData` received from our dApp.

It has an AWS Lambda Function with a function URL configured to be called using the HTTP POST method and with the following body:

```json
{
  "txData": "0x${string}", // the txData signed by the user using our dApp
  "to": "0x...." // where the txData needs to be published
}
```

## Deployment

Since this microservice has been developed using `projen`, to deploy it you have to use the following command:

```bash
npx projen deploy --profile {aws_profile_name}
```

After you deploy it, you will find the AWS Lambda Function URL in the `exports` of the AWS CDK template.