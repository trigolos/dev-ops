import type { AWS } from '@serverless/typescript';

import share from '@functions/share';
import { REGION } from 'src/constants/aws';

const serverlessConfiguration: AWS = {
  service: 'notifications',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: REGION,
    stage: 'dev',
    httpApi: {
      cors: true,
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SNS_SUBSCRIPTION_SMS_ENDPOINT: process.env.SNS_SUBSCRIPTION_SMS_ENDPOINT,
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['sns:Publish', 'ses:SendEmail'],
            Resource: '*',
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      SNSShareQuoteTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'shareQuote',
        },
      },
      SNSShareQuoteSMSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${env:SNS_SUBSCRIPTION_SMS_ENDPOINT}',
          Protocol: 'sms',
          TopicArn: { Ref: 'SNSShareQuoteTopic' },
        },
      },
    },
  },
  functions: { share },
};

module.exports = serverlessConfiguration;
