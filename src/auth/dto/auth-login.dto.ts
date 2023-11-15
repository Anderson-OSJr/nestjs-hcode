/* eslint-disable prettier/prettier */
import { IsEmail, IsStrongPassword } from 'class-validator';

/* eslint-disable prettier/prettier */
export class AuthLoginDTO {
  
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minUppercase:1,
        minLowercase: 1,
        minSymbols: 1,
      })
    password: string;
}
