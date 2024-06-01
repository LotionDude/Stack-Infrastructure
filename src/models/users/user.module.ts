import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { UserControllerV1 } from './controllers/user.controller.v1';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControllerV1],
  providers: [UserService],
})
export class UserModule {}
