import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
  async create(createUserDto: CreateUserDto) {
    const regexPhone = /^(?:\((?=\d{2}\))(\d{2})\)\s?)?(9\d{8})$/;
    if (!regexPhone.test(createUserDto.telefone)) {
      return {
        success: false,
        msg: 'Telefone inválido.'
      }
    }
    if (!this.cpfValidation(createUserDto.cpf)) {
      return {
        success: false,
        msg: 'CPF inválido.'
      }
    }

    await this.userModel.create(createUserDto);

    return {
      success: true
    };

  }

  cpfValidation(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;
    var add = 0;
    for (var i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return false;
    add = 0;
    for (i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return false;
    return true;
  }

  async findAll() {
    const result = await this.userModel.find().exec()
    if (!result) {
      return {
        success: false,
        msg: 'Não há usuários cadastrados'
      }
    }
    return result
  }

  async findOne(cpf: string) {
    const result = await this.userModel.findOne({ cpf: cpf }).exec()
    if (!result) {
      return {
        success: false,
        msg: 'Informações de CPF não armazenadas.'
      }
    }

    return result
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto)
    if (!result) {
      return {
        success: false,
        msg: 'Usuário inválido'
      }
    }

    return {
      success: true,
    }
  }

  async remove(id: string) {
    const result = await this.userModel.deleteOne({ _id: id })
    if (!result) {
      return {
        success: false,
        msg: 'Usuário inválido'
      }
    }

    return {
      success: true
    }
  }
}
