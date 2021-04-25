import { Injectable } from '@nestjs/common';
import { Message } from '@dev-ops/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
