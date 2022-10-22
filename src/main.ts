import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from 'passport';
async function bootstrap() {
  const { SESSION_CONSTANT } = process.env
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: SESSION_CONSTANT,
    saveUninitialized: true,
    resave: false,
    name: 'CHAT_SERVER_SESS_ID',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
