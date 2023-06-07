import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersServiceMock } from './_mockups_/users.service';
import { userStub } from './stubs/user.stub';
import { createUserDto } from './_mockups_/createUserDto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock
        }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = await service.create(createUserDto)
      expect(result).toEqual({ success: true })
    })

    it('should return invalid cpf', async () => {
      const createUserDtoInvalidCpf: CreateUserDto = {
        nome: 'Tarcio',
        sobrenome: 'Sousa',
        cpf: '0856488896',
        telefone: '(94)984097406'
      }
      const expectedResult = { success: false, msg: 'CPF inválido.' };
      const result = await service.create(createUserDtoInvalidCpf)
      expect(result).toEqual(expectedResult)
    });

    it('should return invalid phone', async () => {
      const createUserDtoInvalidPhone: CreateUserDto = {
        nome: 'Tarcio',
        sobrenome: 'Sousa',
        cpf: '04157000277',
        telefone: '(94)84097406'
      }
      const expectedResult = { success: false, msg: 'Telefone inválido.' };
      const result = await service.create(createUserDtoInvalidPhone)
      expect(result).toEqual(expectedResult)
    });
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedValue = { result: [userStub, userStub], success: true }
      const result = await service.findAll();
      expect(result).toEqual(expectedValue);
    })

    it('should return message error by list all users', async () => {
      const expectedResult = { success: false, msg: 'Não há usuários cadastrados' };
      const createSpyService = jest.spyOn(service, 'findAll').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await service.findAll();
      expect(createSpyService).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  })

  describe('findOne', () => {
    it('should return one user', async () => {
      const expectedValue = { result: userStub, success: true }
      const result = await service.findOne(userStub.cpf);
      expect(result).toEqual(expectedValue);
    })

    it('should return message error by find user', async () => {
      const expectedResult = { success: false, msg: 'Informações de CPF não armazenadas.' };
      const createSpy = jest.spyOn(service, 'findOne').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await service.findOne(userStub.cpf);
      expect(createSpy).toHaveBeenCalledWith(userStub.cpf);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('update', () => {
    const mockUpdateUser: UpdateUserDto = {
      cpf: '04157000277',
      nome: 'Tarcio',
      sobrenome: 'Sillva',
      telefone: '(94)984097406'
    }

    it('should update a user', async () => {
      const expectedValue = { result: { _id: '123', ...mockUpdateUser }, success: true }
      const result = await service.update(userStub._id, mockUpdateUser);
      expect(result).toEqual(expectedValue)
    })

    it('should return message error to update a user', async () => {
      const expectedResult = { success: false, msg: 'Usuário inválido' };
      const result = await service.update('456', mockUpdateUser);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('delete', () => {
    it('should delete a user', async () => {
      const expectedValue = { success: true };
      const result = await service.remove(userStub._id);
      expect(result).toEqual(expectedValue);
    })

    it('user not deleted', async () => {
      const expectedResult = { success: false, msg: 'Usuário inválido.' };
      const result = await service.remove('456');
      expect(result).toEqual(expectedResult);
    });
  })
});
