import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AdminUser, AdminUserSchema } from "./schemas/admin.schema"
import { AuthGuard } from '../auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: AdminUser.name, schema: AdminUserSchema }
  ])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports:[UsersService]
})
export class UsersModule { }
