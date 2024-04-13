import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import assert from 'assert';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { createPublicClient, createWalletClient, fallback, http, webSocket } from 'viem';

const relayerPrivateKey: string | undefined = process.env.RELAYER_PRIVATE_KEY;
const baseHttpsUrl: string | undefined = process.env.BASE_HTTPS_URL;
const baseWssUrl: string | undefined = process.env.BASE_WSS_URL;

assert(!!relayerPrivateKey, 'The relayerPrivateKey must be provided');
assert(!!baseHttpsUrl, 'The baseHttpsUrl must be provided');
assert(!!baseWssUrl, 'The baseWssUrl must be provided');

/**
 * Created a viem Wallet Client
 */
export const createViemWalletClient = async () => {
  const account = privateKeyToAccount(relayerPrivateKey as `0x${string}`);
  const chain = base;
  const transportWss = webSocket(baseWssUrl);
  const transportHttps = http(baseHttpsUrl);
  return createWalletClient({
    account: account,
    chain: chain,
    transport: fallback([
      transportWss,
      transportHttps,
      http(), // finally fall back to the public one
    ]),
  });
};

/**
 * Created a viem Public Client
 * @param chainId
 */
export const createViemPublicClient = async () => {
  const chain = base;
  const transportWss = webSocket(baseWssUrl);
  const transportHttps = http(baseHttpsUrl);
  const client = createPublicClient({
    chain: chain,
    transport: fallback([
      transportWss,
      transportHttps,
      http(), // finally fall back to the public one
    ]),
  });
  return client;
};

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    console.log('Event', JSON.stringify(event));
    const body = !!event.body ? JSON.parse(event.body) : {};
    console.log('Body', JSON.stringify(body));
    assert(!!body.txData, 'txData must be provided');
    assert(!!body.to, 'to must be provided');
    const viemWalletClient = await createViemWalletClient();
    const viemPublicClient = await createViemPublicClient();
    const { txData, to } = body;
    const txHash = await viemWalletClient.sendTransaction({
      to: to,
      data: txData,
    });
    const receipt = await viemPublicClient.waitForTransactionReceipt({
      hash: txHash,
    });
    console.log(receipt);
    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        txHash: txHash,
        // receipt: receipt,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    };
  }
};