import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminUserDocument = HydratedDocument<AdminUser>;

@Schema()
export class AdminUser {
    @Prop()
    nome: string;
    
    @Prop()
    sobrenome: string;

    @Prop()
    telefone: string;

    @Prop()
    password: string;

    @Prop()
    role:string;

    constructor(adminUser?: Partial<AdminUser>) {
        this.nome = adminUser.nome,
        this.sobrenome = adminUser.sobrenome,
        this.telefone = adminUser.telefone
        this.password = adminUser.password
        this.role = adminUser.role
    }
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);