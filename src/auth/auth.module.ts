/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MyEnv } from 'myEnv';


const tokenSignature = String(new MyEnv().tokenSignature);
@Module({
  imports: [
    MyEnv,
    JwtModule.register({
      secret: tokenSignature,
    }),
    UsersModule,
    PrismaModule,    
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
