import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
/* 
const newUser = new User({ nome: 'Tarcio', sobrenome: 'Sousa', cpf: '04157000277', telefone: '(94)984097406' }) */

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const body: CreateUserDto = {
    nome: 'Tarcio',
    sobrenome: 'Sousa',
    cpf: '04157000277',
    telefone: '(94)984097406'
  }

  const mockUser: User = {
    nome: 'Tarcio',
    sobrenome: 'Sousa',
    cpf: '04157000277',
    telefone: '(94)984097406'
  }

  const mockUsers: User[] = [
    {
      nome: 'Tarcio',
      sobrenome: 'Sousa',
      cpf: '04157000277',
      telefone: '(94)984097406'
    },
    {
      nome: 'Ana',
      sobrenome: 'Sousa',
      cpf: '03058265488',
      telefone: '(94)984157011'
    }
  ]

  const mockUpdateUser: UpdateUserDto = {
    nome: 'Tarcio',
    sobrenome: 'Sillva',
    cpf: '04157000277',
    telefone: '(94)984097406'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({ success: true }),
            findAll: jest.fn().mockResolvedValue({ ...mockUsers, success: true }),
            findOne: jest.fn().mockResolvedValue({ ...mockUser, success: true }),
            update: jest.fn().mockResolvedValue({ ...mockUpdateUser, success: true }),
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
    it('success create a new user', async () => {
      const result = await controller.create(body)
      const showResult = {
        success: true
      }
      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(showResult)
    })

    it('invalid CPF', async () => {
      const expectedResult = { success: false, msg: 'CPF inválido.' };
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.create(body);
      expect(createSpy).toHaveBeenCalledWith(body);
      expect(result).toEqual(expectedResult);
    });

    it('invalid phone', async () => {
      const expectedResult = { success: false, msg: 'Telefone inválido.' };
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.create(body);
      expect(createSpy).toHaveBeenCalledWith(body);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('findOne', () => {
    it('shold a user', async () => {
      const expectedValue = { ...mockUser, success: true }
      const result = await controller.findOne(mockUser.cpf)
      expect(service.findOne).toHaveBeenCalled();
      expect(result).toEqual(expectedValue)
    })

    it('user not found', async () => {
      const expectedResult = { success: false, msg: 'Informações de CPF não armazenadas.' };
      const createSpy = jest.spyOn(service, 'findOne').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.findOne(mockUser.cpf);
      expect(createSpy).toHaveBeenCalledWith(mockUser.cpf);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('findAll', () => {
    it('shold all users', async () => {
      const expectedValue = { ...mockUsers, success: true }
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedValue);
    })

    it('shold error', async () => {
      const expectedResult = { success: false, msg: 'Não há usuários cadastrados' };
      const createSpy = jest.spyOn(service, 'findAll').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.findAll();
      expect(createSpy).toHaveBeenCalledWith();
      expect(result).toEqual(expectedResult)
    })
  })

  describe('update', () => {
    it('update a user', async () => {
      const expectedValue = { ...mockUpdateUser, success: true }
      const result = await controller.update("63572ab3e86402d0bbfcb46c", mockUpdateUser);
      expect(service.update).toHaveBeenCalledWith("63572ab3e86402d0bbfcb46c", mockUpdateUser);
      expect(result).toEqual(expectedValue)
    })

    it('user not updated', async () => {
      const expectedResult = { success: false, msg: 'Usuário inválido.' };
      const createSpy = jest.spyOn(service, 'update').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.update("63572ab3e86402d0bbfcb46c", mockUpdateUser);
      expect(createSpy).toHaveBeenCalledWith("63572ab3e86402d0bbfcb46c", mockUpdateUser);
      expect(result).toEqual(expectedResult);
    });
  })

  describe('delete', () => {
    it('delete a user', async () => {
      const result = await controller.remove("63572ab3e86402d0bbfcb46c");
      expect(service.remove).toHaveBeenCalledWith("63572ab3e86402d0bbfcb46c");
      expect(result).toEqual({ success: true })
    })

    it('user not deleted', async () => {
      const expectedResult = { success: false, msg: 'Usuário inválido.' };
      const createSpy = jest.spyOn(service, 'remove').mockResolvedValueOnce(Promise.resolve(expectedResult));
      const result = await controller.remove("63572ab3e86402d0bbfcb46c");
      expect(createSpy).toHaveBeenCalledWith("63572ab3e86402d0bbfcb46c");
      expect(result).toEqual(expectedResult);
    });
  })
});
