import { Module } from '@nestjs/common';
import { ActionsControllerV1 } from './controllers/actions.controller.v1';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from './entities/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  controllers: [ActionsControllerV1],
  providers: [ActionsService],
})
export class ActionsModule {}
