import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { createResponse } from '../../utils/http';

@Controller('ping')
export class PingController {
  @Get('')
  root(@Res() res: Response) {
    res.json(
      createResponse({
        time: new Date().toISOString(),
      }),
    );
  }
}
