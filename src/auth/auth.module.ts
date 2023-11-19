/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenSignature } from 'myEnv';


const tokenSignature = String(new TokenSignature());
@Module({
  imports: [
    TokenSignature,
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
