import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) { }
    async authentication(phone: string, password: string) {
        const user = await this.userService.findAdmin(phone)
        
        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!password) {
            throw new UnauthorizedException();
        }

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!isMatchPassword) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
