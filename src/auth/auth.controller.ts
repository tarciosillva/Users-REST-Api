import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('authentication')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.authentication(signInDto.telefone, signInDto.password);
  }
}
