import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        name, //poderia ser <name: name, > mas o TS já entende. Se os nomes fossem diferentes, teria que coloclar.
        email,
        password,
      },
    });
  }
  /* Em vez de receber um objeto, como acima, poderia receber uma constante userData
  tal como a seguir:
  async create(userData: CreateUserDTO) {
    data,
  } */
}
