import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Users API Blue lab Test')
    .setDescription('REST API of users')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
