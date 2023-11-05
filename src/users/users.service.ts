/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UsersService {

  //Always a constructor for dependency injection.
  constructor(private readonly prisma: PrismaService) {}

  //Creates one user at time.
  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
  }
 
  //lists all users created in the databank.
  async listAll() {
    return this.prisma.user.findMany();
  }

  //lists only one user selected by ID.
  async listUserByID(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  // To check ID existence, to avoid errors.
  async isIdListed(id: number) {
    if(!(await this.listUserByID(id))) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }
  }  

  async updateByID(id: number, { name, email, password, birthAt }: UpdatePutUserDTO) {

    await this.isIdListed(id);
    
    return this.prisma.user.update({
      data: { name, email, password, birthAt: birthAt? new Date(birthAt) : null },
      where: {
        id,
      },
    });
  }


  async updatePartialByID(id: number, {name, email, password, birthAt}: UpdatePatchUserDTO) {

    await this.isIdListed(id);

    const data: any = {};

    if(birthAt) {data.birthAt = new Date(birthAt)};
    if(name) {data.name = name};
    if(email) {data.email = email};
    if(password) {data.password = password};

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteUserByID(id: number) {    
    
    await this.isIdListed(id);

    return this.prisma.user.delete({
      where: {
        id,
      }
    });
  }
}
