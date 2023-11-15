/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
              private readonly userService: UsersService,
              private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.userService.create(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDTO) {
    return this.authService.forgottenPassword(body.email);
  }

  @Post('reset')
  async reset(@Body() body: AuthResetDTO) {
    return this.authService.reset(body.password, body.token);
  }
}