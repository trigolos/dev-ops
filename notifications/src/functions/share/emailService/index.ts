import { SES } from 'aws-sdk';
import { REGION } from '../../../constants/aws';

export const sendEmail = (emailHtml: string, emailAddresses: string[]) => {
  const ses = new SES({ region: REGION });
  return ses
    .sendEmail({
      Destination: {
        ToAddresses: emailAddresses,
      },
      Message: {
        Body: {
          Html: { Data: emailHtml },
        },
        Subject: {
          Data: 'Quote application',
        },
      },
      Source: process.env.SES_SUBSCRIPTION_EMAIL_ENDPOINT,
    })
    .promise();
};
