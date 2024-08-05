import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const configSwagger =  new DocumentBuilder()
    .setTitle('WeEat')
    .setDescription('The WEEAT API Documentation')
    .setVersion('0.1')
    .addTag('weeat')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
