/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  
  constructor(
              private readonly jwtService: JwtService,
              private readonly prisma: PrismaService
  ) {}

  async createToken() {
    //return this.jwtService.sign();
  }

  async checkToken(token: string) {
    //return this.jwtService.verify();
  }

  async login(email: string, password: string) {
    
    const user = await this.prisma.user.findFirst({
      where: {
          email, 
          password,
      }
    });

    if(!user) {
      throw new UnauthorizedException('Email adress or password is incorrect.');
    }

    return user;
  }
  
  async forgottenPassword(email: string) {

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      }
    });

    if(!user) {
      throw new UnauthorizedException('Email adress is incorrect.');
    }

    // TO DO: what your really want is to send an email.
    return true;
  }

  async reset(password: string, token: string) {

    // TO DO: only to validate the token.
    const id = 0;

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      }
    });

    return true;
  }
}
