import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserDto } from './_mockups_/createUserDto';
import { userStub } from './stubs/user.stub';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUpdateUser: UpdateUserDto = {
    nome: 'Tarcio',
    sobrenome: 'Sillva',
    cpf: '65485322599',
    telefone: '(94)984125599'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({ success: true }),
            findAll: jest.fn().mockResolvedValue({ result: [userStub, userStub], success: true }),
            findOne: jest.fn().mockResolvedValue({ result: userStub, success: true }),
            update: jest.fn().mockResolvedValue({ result: { _id: '123', ...mockUpdateUser }, success: true }),
            remove: jest.fn().mockResolvedValue({ success: true })
          }
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined()
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = await controller.create(createUserDto)
      const showResult = {
        success: true
      }
      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(showResult)
    })

    it('should return invalid cpf', async () => {
      const expectedResult = { success: false, msg: 'CPF inválido.' };
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedResult);
    });

    it('should return invalid phone', async () => {
      const expectedResult = { success: false, msg: 'Telefone inválido.' };
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('findOne', () => {
    it('should return one user', async () => {
      const expectedValue = { result: userStub, success: true }
      const result = await controller.findOne(userStub.cpf)
      expect(service.findOne).toHaveBeenCalled();
      expect(result).toEqual(expectedValue)
    })

    it('should return message error by find user', async () => {
      const expectedResult = { success: false, msg: 'Informações de CPF não armazenadas.' };
      const createSpy = jest.spyOn(service, 'findOne').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.findOne(userStub.cpf);
      expect(createSpy).toHaveBeenCalledWith(userStub.cpf);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedValue = { result: [userStub, userStub], success: true }
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedValue);
    })

    it('should return message error by list all users', async () => {
      const expectedResult = { success: false, msg: 'Não há usuários cadastrados' };
      const createSpy = jest.spyOn(service, 'findAll').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.findAll();
      expect(createSpy).toHaveBeenCalledWith();
      expect(result).toEqual(expectedResult)
    })
  })

  describe('update', () => {
    it('should update a user', async () => {
      const expectedValue = { result: { _id: '123', ...mockUpdateUser }, success: true }
      const result = await controller.update(userStub._id, mockUpdateUser);
      expect(service.update).toHaveBeenCalledWith(userStub._id, mockUpdateUser);
      expect(result).toEqual(expectedValue)
    })

    it('should return message error to update a user', async () => {
      const expectedResult = { success: false, msg: 'Usuário inválido.' };
      const createSpy = jest.spyOn(service, 'update').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.update(userStub._id, mockUpdateUser);
      expect(createSpy).toHaveBeenCalledWith(userStub._id, mockUpdateUser);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = await controller.remove(userStub._id);
      expect(service.remove).toHaveBeenCalledWith(userStub._id);
      expect(result).toEqual({ success: true })
    })

    it('should return message error to delete a user', async () => {
      const expectedResult = { success: false, msg: 'Usuário inválido.' };
      const createSpy = jest.spyOn(service, 'remove').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.remove(userStub._id);
      expect(createSpy).toHaveBeenCalledWith(userStub._id);
      expect(result).toEqual(expectedResult);
    });
  })
});
