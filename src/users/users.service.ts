import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { User } from './schemas/user.schema';
import { phoneValidation } from './utils/phoneValidation';
import { cpfValidation } from './utils/cpfValidation';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly connection: Connection) { }

  async create(createUserDto: CreateUserDto) {
    if (!phoneValidation(createUserDto.telefone)) {
      return {
        success: false,
        msg: 'Telefone inválido.'
      }

    }
    if (!cpfValidation(createUserDto.cpf)) {
      return {
        success: false,
        msg: 'CPF inválido.'
      }
    }
    await this.connection.model(User.name).create(createUserDto);
    return {
      success: true
    };
  }

  async findAll() {
    const result = await this.connection.model(User.name).find()
    if (!result) {
      return {
        success: false,
        msg: 'Não há usuários cadastrados'
      }
    }

    return {
      result,
      success: true
    }
  }

  async findOne(cpf: string) {
    const result = await this.connection.model(User.name).findOne({ cpf: cpf })
    if (!result) {
      return {
        success: false,
        msg: 'Informações de CPF não armazenadas.'
      }
    }

    return {
      result,
      success: true
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.connection.model(User.name).findByIdAndUpdate({ _id: id }, updateUserDto)
    if (!result) {
      return {
        success: false,
        msg: 'Usuário inválido'
      }
    }

    return {
      result,
      success: true,
    }
  }

  async remove(id: string) {
    const result = await this.connection.model(User.name).findOneAndDelete({ _id: id })
    if (!result) {
      return {
        success: false,
        msg: 'Usuário inválido.'
      }
    }

    return {
      success: true
    }
  }
}
