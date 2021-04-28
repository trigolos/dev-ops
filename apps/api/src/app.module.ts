import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PingController } from './controllers/ping/ping.controller';
import { QuotesController } from './controllers/quotes/quotes.controller';
import { QuotesService } from './services/quotes/quotes.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*', '/ping'],
    }),
  ],
  controllers: [PingController, QuotesController],
  providers: [QuotesService],
})
export class AppModule {}
