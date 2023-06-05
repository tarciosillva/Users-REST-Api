import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"
import { userStub } from "../stubs/user.stub"
import { cpfValidation } from "../utils/cpfValidation"
import { phoneValidation } from "../utils/phoneValidation"

export class UsersServiceMock {
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

        return {
            success: true
        };
    }

    async findAll() {
        const result = [userStub, userStub]
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
        const result = [userStub].find((user => user.cpf === cpf))
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
        var result = [userStub].find((user => user._id === id))

        if (!result) {
            return {
                success: false,
                msg: 'Usuário inválido'
            }
        }

        return {
            result:{_id:userStub._id, ...updateUserDto},
            success: true,
        }
    }
    async remove(id: string) {
        const result = [userStub].find((user => user._id === id))
        if (!result) {
            /* Usuário não foi encontrado */
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