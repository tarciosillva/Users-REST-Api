import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthServiceMockup } from './_mockups_/auth.service';
import { adminStub } from './stubs/admin.stub';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: AuthService,
        useClass: AuthServiceMockup,
        useValue: {
          signIn: jest.fn().mockResolvedValue({ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" })
        }
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authentication', () => {
    it('authentication user', async () => {
      const result = await service.authentication(adminStub.telefone, adminStub.password);
      expect(result).toEqual({ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" });
    })

    it('error authentication user', async () => {
      const result = await service.authentication(adminStub.telefone, 'asdf')
      expect(result).toEqual(new UnauthorizedException)
    })
  })
});
