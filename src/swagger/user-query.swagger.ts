import { ApiProperty } from "@nestjs/swagger";

export class UserQuery{
    @ApiProperty()
    cpf:string
 }