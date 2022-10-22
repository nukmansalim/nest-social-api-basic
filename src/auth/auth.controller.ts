import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Routes } from 'src/utils/contants';

@Controller(Routes.AUTH)
export class AuthController {
   @UseGuards(AuthGuard('local'))
   @Post('login')
   async login(@Request() req) {
      return "OK"
   }
}
