import { HttpStatus } from '@nestjs/common';

export const createResponse = <T>(data: T, message = 'OK', statusCode = HttpStatus.OK) => ({
  message: message,
  statusCode: statusCode,
  ...data,
});
