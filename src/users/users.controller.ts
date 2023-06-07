import { Controller, Get, Post, Body, Param, Delete, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/role.enum';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth
} from '@nestjs/swagger';
import { userStub } from './stubs/user.stub';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles(Role.Admin)
  @Post()
  @ApiResponse({ status: 201, schema: { example: { success: true } } })
  @ApiResponse({ status: 400, schema: { example: { msg: 'Telefone inválido || CPF inválido', success: false } } })
  @ApiOperation({ summary: 'Create a usuer' })
  @ApiBearerAuth('access-token')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiResponse({ status: 200, schema: { example: { success: true, result: [userStub] } }, isArray: true })
  @ApiResponse({ status: 404, schema: { example: { success: false, msg: 'Não há usuários cadastrados' } } })
  @ApiOperation({ summary: 'Return all users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':cpf')
  @ApiResponse({ status: 200, schema: { example: { success: true, result: userStub } } })
  @ApiResponse({ status: 404, schema: { example: { msg: 'Informações de CPF não armazenadas.', success: false } } })
  @ApiOperation({ summary: 'Get user by cpf' })
  @ApiBearerAuth('access-token')
  async findOne(@Param('cpf') cpf: string) {
    return await this.usersService.findOne(cpf);
  }

  @Roles(Role.Admin)
  @Put(':id')
  @ApiResponse({ status: 200, schema: { example: { success: true, result: userStub } } })
  @ApiResponse({ status: 400, schema: { example: { success: false, msg: 'Usuário inválido' } } })
  @ApiOperation({ summary: 'Update a user' })
  @ApiBearerAuth('access-token')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @ApiResponse({ status: 400, schema: { example: { success: false, msg: 'Usuário inválido' } } })
  @ApiOperation({ summary: 'Delete a user' })
  @ApiBearerAuth('access-token')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}

