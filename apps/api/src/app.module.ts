import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PingController } from './controllers/ping/ping.controller';
import { QuotesController } from './controllers/quotes/quotes.controller';
import { QuotesService } from './services/quotes/quotes.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PingController, QuotesController],
  providers: [QuotesService],
})
export class AppModule {}
