import { User } from "../users/schemas/user.schema";

export class userSwagger extends User {
    nome: string;
    sobrenome: string;
    telefone: string;
    cpf: string
}