import { ApiProperty } from "@nestjs/swagger"

export class SignInDto {
    @ApiProperty()
    telefone: string
    @ApiProperty()
    password: string
}