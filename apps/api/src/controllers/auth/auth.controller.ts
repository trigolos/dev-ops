import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../services/auth/local-auth.guard';
import { createResponse } from '../../utils/http';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const data = await this.authService.login(req.user);
    return createResponse({ data });
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout() {
    // TODO: implement logout
  }
}
