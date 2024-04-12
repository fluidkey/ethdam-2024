import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.137.0',
  defaultReleaseBranch: 'main',
  name: '@ethdam-2024/relayer',
  projenrcTs: true,
  github: false,
  description: 'The ETH DAM 2024 Relayer',
  depsUpgrade: true,
  gitignore: ['.idea/', '.env', '.yalc'],
  appEntrypoint: 'backend-transaction-relayer.ts',
  deps: [
    'aws-lambda@1.0.7',
    'dotenv@16.4.5',
    'viem@2.7.1',
  ],
  devDeps: [
    '@types/aws-lambda@8.10.133',
  ],
});
project.synth();