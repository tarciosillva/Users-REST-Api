import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('authentication')
  @ApiOperation({ summary: 'Authentication admin user' })
  @ApiResponse({ status: 200, schema: { example: { access_token: "yJhbGciOiJIUzI15cCI..." } } })
  @ApiResponse({ status: 401, schema: { example: { statusCode: 401, message: "Unauthorized" } } })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.authentication(signInDto.telefone, signInDto.password);
  }
}
