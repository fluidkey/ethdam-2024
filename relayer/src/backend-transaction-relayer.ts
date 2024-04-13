import assert from 'assert';
import * as cdk from 'aws-cdk-lib';
import { App, Stack, aws_logs, RemovalPolicy, aws_lambda, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BackendRelayerStackProps } from './backend-transaction-relayer-types';
import { BackendRelayerFunction } from './lambda-functions/backend-relayer/backend-relayer-function';
import 'dotenv/config';

export class BackendRelayerStack extends Stack {
  constructor(scope: Construct, id: string, props: BackendRelayerStackProps) {
    super(scope, id, props);
    assert(props.relayerPrivateKey, 'The relayerPrivateKey must be provided');
    assert(props.baseHttpsUrl, 'The baseHttpsUrl must be provided');
    assert(props.baseWssUrl, 'The baseWssUrl must be provided');
    // create the backend relayer log groups in which the logs of the backend relayer lambda function will be stored
    const backendRelayerLogGroup = new aws_logs.LogGroup(
      this,
      'BackendRelayerLogGroup',
      {
        logGroupName: '/aws/lambda/dev-ethdam-2024-backend-relayer',
        retention: aws_logs.RetentionDays.TWO_WEEKS,
        logGroupClass: aws_logs.LogGroupClass.STANDARD,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    );
    // create the backend relayer lambda function
    const backendRelayerLambdaFunction = new BackendRelayerFunction(
      this,
      'BackendRelayerFunction',
      {
        functionName: 'dev-ethdam-2024-backend-relayer',
        logGroup: backendRelayerLogGroup,
        description: 'Publish the withdrawal procedure transaction',
        timeout: Duration.seconds(60),
        memorySize: 512,
        architecture: aws_lambda.Architecture.ARM_64,
        environment: {
          RELAYER_PRIVATE_KEY: props.relayerPrivateKey,
          BASE_HTTPS_URL: props.baseHttpsUrl,
          BASE_WSS_URL: props.baseWssUrl,
        },
      },
    );
    // create the backend relayer lambda function URL to be called by the Frontend
    const lambdaUrl = backendRelayerLambdaFunction.addFunctionUrl({
      authType: aws_lambda.FunctionUrlAuthType.NONE,
      invokeMode: aws_lambda.InvokeMode.BUFFERED,
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      },
    });
    new cdk.CfnOutput(this, 'BackendRelayerLambdaUrl', {
      value: lambdaUrl.url,
      description: 'The URL to invoke the backend relayer lambda function',
    });
  };
};

const app = new App();

const stack = new BackendRelayerStack(
  app,
  'ethdam-2024-backend-relayer-dev',
  {
    env: {
      region: 'eu-west-1',
    },
    relayerPrivateKey: process.env.RELAYER_PRIVATE_KEY!,
    baseHttpsUrl: process.env.BASE_HTTPS_URL!,
    baseWssUrl: process.env.BASE_WSS_URL!,
  },
);
cdk.Tags.of(stack).add('microservice', 'ethdam-2024');
cdk.Tags.of(stack).add('environment', 'dev');
app.synth();