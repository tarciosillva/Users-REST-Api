import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceMockup } from './_mockups_/auth.service';
import { adminStub } from './stubs/admin.stub';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useClass: AuthServiceMockup,
        useValue: {
          signIn: jest.fn().mockResolvedValue({ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" })
        }
      }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined()
  });


  describe('authentication', () => {
    it('authentication user', async () => {
      const result = await controller.signIn({ telefone: adminStub.telefone, password: adminStub.password });
      expect(result).toEqual({ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" });
    })

    it('error authentication user', async () => {
      const result = await controller.signIn({ telefone: adminStub.telefone, password: 'asdf' })
      expect(result).toEqual(new UnauthorizedException)
    })
  })
});
