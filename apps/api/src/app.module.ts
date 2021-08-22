import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PingController } from './controllers/ping/ping.controller';
import { QuotesController } from './controllers/quotes/quotes.controller';
import { QuotesService } from './services/quotes/quotes.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { LocalStrategy } from './services/auth/local.strategy';
import { jwtConstants } from './services/auth/constants';
import { JwtStrategy } from './services/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PingController, QuotesController, AuthController],
  providers: [QuotesService, UsersService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
