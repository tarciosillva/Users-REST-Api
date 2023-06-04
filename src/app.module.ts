import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
