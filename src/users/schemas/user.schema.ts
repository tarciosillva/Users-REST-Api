import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    sobrenome: string;

    @Prop({ required: true })
    telefone: string;

    @Prop({ required: true })
    cpf: string
}

export const UserSchema = SchemaFactory.createForClass(User);