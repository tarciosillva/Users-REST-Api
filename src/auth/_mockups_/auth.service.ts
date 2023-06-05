import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { adminStub } from '../stubs/admin.stub';

export class AuthServiceMockup {
    async validateUser(email: string, password: string): Promise<void> {

    }

    async authentication(phone: string, password: string) {
        const user = [adminStub].find((admin) => admin.telefone === phone)

        if (!user || user.password !== password) {
            return new UnauthorizedException();
        }

        return {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        };
    }
}