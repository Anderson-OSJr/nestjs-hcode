import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModuleModule } from './auth.module/auth.module.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModuleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
