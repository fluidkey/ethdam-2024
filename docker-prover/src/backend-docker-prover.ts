import path from 'node:path';
import { App, Stack, StackProps, aws_ec2, aws_ecs, aws_logs, RemovalPolicy } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { configDotenv } from 'dotenv';

configDotenv();

export class DockerProverStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const vpc = aws_ec2.Vpc.fromLookup(
      this,
      'DefaultVpc',
      {
        isDefault: true,
      },
    );
    const ecsCluster = new aws_ecs.Cluster(
      this,
      'ECSCluster',
      {
        clusterName: 'docker-prover-cluster',
        enableFargateCapacityProviders: true,
        containerInsights: false,
        vpc: vpc,
      },
    );
    // the ecs task definition containing cpu architecture, cpu and memory
    const taskDefinition = new aws_ecs.TaskDefinition(
      this,
      'ECSTaskDefinition',
      {
        family: 'docker-prover-task',
        cpu: '256',
        memoryMiB: '1024',
        runtimePlatform: {
          cpuArchitecture: aws_ecs.CpuArchitecture.X86_64,
          operatingSystemFamily: aws_ecs.OperatingSystemFamily.LINUX,
        },
        compatibility: aws_ecs.Compatibility.FARGATE,
        networkMode: aws_ecs.NetworkMode.AWS_VPC,
      },
    );
    const ecsLogGroup = new aws_logs.LogGroup(
      this,
      'LogGroup',
      {
        retention: aws_logs.RetentionDays.TWO_WEEKS,
        removalPolicy: RemovalPolicy.DESTROY,
        logGroupClass: aws_logs.LogGroupClass.STANDARD,
        logGroupName: 'ethdam-2024-docker-prover.log-group',
      },
    );
    // add the container with the docker image built locally
    taskDefinition.addContainer(
      'DockerProverContainer',
      {
        containerName: 'docker-prover-container',
        portMappings: [
          {
            protocol: aws_ecs.Protocol.TCP,
            hostPort: 8080,
            containerPort: 8080,
          },
        ],
        image: aws_ecs.ContainerImage.fromAsset(path.resolve(__dirname, 'docker-image/')),
        logging: aws_ecs.LogDriver.awsLogs({ logGroup: ecsLogGroup, streamPrefix: 'ecs' }),
      },
    );
    const ecsServiceSecurityGroup = new aws_ec2.SecurityGroup(
      this,
      'EcsBackendServiceSecurityGroup',
      {
        vpc: vpc,
        securityGroupName: 'ethdam-2024-backend-docker-prover-service.security-group',
        allowAllOutbound: true,
      },
    );
    ecsServiceSecurityGroup.addIngressRule(aws_ec2.Peer.anyIpv4(), aws_ec2.Port.allTraffic());
    // create the fargate service
    new aws_ecs.FargateService(
      this,
      'ECSService',
      {
        serviceName: 'docker-prover-service',
        cluster: ecsCluster,
        taskDefinition: taskDefinition,
        desiredCount: 1,
        platformVersion: aws_ecs.FargatePlatformVersion.LATEST,
        assignPublicIp: true,
        minHealthyPercent: 100,
        maxHealthyPercent: 200,
        vpcSubnets: {
          subnets: vpc.publicSubnets,
          onePerAz: true,
        },
        securityGroups: [ecsServiceSecurityGroup],
        propagateTags: aws_ecs.PropagatedTagSource.SERVICE,
      },
    );
  };
}

const app = new App();

const stack = new DockerProverStack(app, 'docker-prover-dev', {
  env: {
    account: process.env.ACCOUNT,
    region: process.env.REGION,
  },
});
cdk.Tags.of(stack).add('microservice', 'ethdam-2024');
cdk.Tags.of(stack).add('environment', 'dev');
app.synth();
