import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.137.0',
  defaultReleaseBranch: 'main',
  name: '@ethdam-2024/docker-prover',
  projenrcTs: true,
  github: false,
  description: 'The ETH DAM 2024 Docker Prover',
  depsUpgrade: true,
  gitignore: ['.idea/', '.env', '.yalc'],
  appEntrypoint: 'backend-docker-prover.ts',
  deps: [
    'aws-lambda@1.0.7',
    'express@4.19.2',
    'body-parser@1.20.2',
    'dotenv@16.4.5',
  ],
  devDeps: [
    '@types/express@4.17.21',
    '@types/aws-lambda@8.10.133',
  ],
});
project.synth();
