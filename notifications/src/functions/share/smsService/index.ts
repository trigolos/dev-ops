import { SNS } from 'aws-sdk';
import { REGION } from '../../../constants/aws';

export const sendSms = (smsMessage: string, phone: string) => {
  const sns = new SNS({ region: REGION, apiVersion: '2010-03-31' });
  return sns
    .publish({
      Message: smsMessage,
      PhoneNumber: phone,
    })
    .promise();
};
