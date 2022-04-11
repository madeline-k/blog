import * as s3 from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WebsiteStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'bucket', {
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}