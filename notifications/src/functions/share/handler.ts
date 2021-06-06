import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { sendSms } from '@functions/share/smsService';
import { sendEmail } from '@functions/share/emailService';

const share: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async ({ body: { email, phone, quote } }) => {
  console.log('SNS_SUBSCRIPTION_SMS_ENDPOINT: ', process.env.SNS_SUBSCRIPTION_SMS_ENDPOINT);
  console.log('SES_SUBSCRIPTION_EMAIL_ENDPOINT: ', process.env.SES_SUBSCRIPTION_EMAIL_ENDPOINT);

  try {
    const quoteString = JSON.stringify(quote, null, '  ');
    if (phone) {
      const result = await sendSms(quoteString, phone);
      console.log('[SNS] MessageID: ', result.MessageId);
    } else if (email) {
      const result = await sendEmail(quoteString, [email]);
      console.log('[SES] MessageID: ', result.MessageId);
    } else {
      return formatJSONResponse(
        {
          message: 'Unknown notification target.',
        },
        400,
      );
    }
  } catch (err) {
    console.error(err, err.stack);
    return formatJSONResponse(
      {
        message: err.message,
      },
      400,
    );
  }

  return formatJSONResponse({
    target: email || phone,
    quote,
  });
};

export const main = middyfy(share);
