import path from 'node:path';
import { App, Stack, StackProps, aws_ec2, aws_ecs } from 'aws-cdk-lib';
import { Construct } from 'constructs';

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
          cpuArchitecture: aws_ecs.CpuArchitecture.ARM64,
          operatingSystemFamily: aws_ecs.OperatingSystemFamily.LINUX,
        },
        compatibility: aws_ecs.Compatibility.FARGATE,
        networkMode: aws_ecs.NetworkMode.AWS_VPC,
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

new DockerProverStack(app, 'docker-prover-dev', {});
// new MyStack(app, 'docker-prover-prod', { env: prodEnv });

app.synth();
