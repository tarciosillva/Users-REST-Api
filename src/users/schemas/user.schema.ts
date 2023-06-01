import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    nome: string;
    
    @Prop()
    sobrenome: string;

    @Prop()
    telefone: string;

    @Prop()
    cpf: string

    constructor(user?: Partial<User>) {
        this.nome = user.nome,
        this.sobrenome = user.sobrenome,
        this.telefone = user.telefone,
        this.cpf = user.cpf
    }
}

export const UserSchema = SchemaFactory.createForClass(User);