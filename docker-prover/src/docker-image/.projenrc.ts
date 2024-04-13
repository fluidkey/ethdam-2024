import { typescript } from 'projen';
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'docker-images',
  projenrcTs: true,
  github: false,
  depsUpgrade: true,
  deps: [
    '@aws-sdk/client-s3@3.523.0',
    '@aws-sdk/client-firehose@3.523.0',
    'express@4.19.2',
    'body-parser@1.20.2',
  ],
  devDeps: [
    '@types/express@4.17.21',
  ],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();