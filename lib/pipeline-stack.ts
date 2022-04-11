import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { WebsiteStage } from './website-stage';

const GITHUB_CONNECTION_ARN = 'arn:aws:codestar-connections:us-west-2:594509634114:connection/023024eb-c283-41a0-9297-054dbd2efec0';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'BlogDeploymentPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('madeline-k/blog', 'main', {
          connectionArn: GITHUB_CONNECTION_ARN,
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    pipeline.addStage(new WebsiteStage(this, 'Website', {
      env: { account: '594509634114', region: 'us-west-2' },
    }))
  }
}

