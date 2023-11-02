import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuring class-validation pipe:
  app.useGlobalPipes(new ValidationPipe());

  //Seems to be good to maintain this line as the last one of this file.
  //Otherwise, the validation pipe will not check properly.
  await app.listen(3000);
}
bootstrap();
