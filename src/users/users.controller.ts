/* eslint-disable prettier/prettier */
import {Controller, Post, Body, Get, Put, Patch, Delete, UseInterceptors,} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UsersService } from './users.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  async create(@Body() userData: CreateUserDTO) {
    return await this.usersService.create(userData);
  }

  @Get()
  async listAll() {
    return this.usersService.listAll();
  }

  @Get(':id')
  async show(@ParamId() id: number) {
    console.log({id});
    return this.usersService.listUserByID(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.usersService.updateByID(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.usersService.updatePartialByID(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.usersService.deleteUserByID(id);
  }
  
}
