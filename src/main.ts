import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuring class-validation pipe:
  app.useGlobalPipes(new ValidationPipe());

  /* A linha abaixo pode ser colocada também aqui para se ativar 
  globalmente o Interceptor */
  //app.useGlobalInterceptors(new LogInterceptor());

  //Seems to be good to maintain this line as the last one of this file.
  //Otherwise, the validation pipe will not check properly.
  await app.listen(3000);
}
bootstrap();
