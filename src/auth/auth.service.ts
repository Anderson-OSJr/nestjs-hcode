/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  
  constructor(
              private readonly jwtService: JwtService,
              private readonly prisma: PrismaService,
              private readonly userService: UsersService,
  ) {}

  /* List of Methods:
    - async createToken(user: User)
    - async checkToken(token: string)
    - async login(email: string, password: string)
    - async forgottenPassword(email: string)
    - async reset(password: string, token: string)
    - async register(data: AuthRegisterDTO)
   */

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      }, {
        expiresIn:'7 days',
        subject: String(user.id),
        issuer: 'login',
        audience: 'users'
      })
    };
  }

  //-------------------------------------------//
  async checkToken(token: string) {
    //Try & Catch block to avoid ERROR message due to invalid token.
    try {

      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      }); 

      return data;   

    } catch (e) {
      throw new BadRequestException(e);
    }    
  }

  //-------------------------------------------//
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

    return this.createToken(user);
  }
  
  //-------------------------------------------//
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

  //-------------------------------------------//
  async reset(password: string, token: string) {

    // TO DO: only to validate the token.
    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      }
    });

    return this.createToken(user);
  }

  //-------------------------------------------//
  async register(data: AuthRegisterDTO) {

    const user = await this.userService.create(data);
    return this.createToken(user);

  }
}
