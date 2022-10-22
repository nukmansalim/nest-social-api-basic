import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "",
      database: "nest_social",
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true

    }),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
