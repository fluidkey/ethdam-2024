import { StackProps } from 'aws-cdk-lib';

export interface BackendRelayerStackProps extends StackProps {
  readonly relayerPrivateKey: string;
  readonly baseHttpsUrl: string;
  readonly baseWssUrl: string;
}