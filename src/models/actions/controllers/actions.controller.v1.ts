import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActionsService } from '../actions.service';
import { DeleteResult } from 'typeorm';
import { Action } from '../entities/action.entity';
import { ApiTags } from '@nestjs/swagger';
import { RequiredActions } from '@/common/decorators/metadata/required-actions.decorator';

@ApiTags('Actions')
@RequiredActions(['VIEW_PERMISSIONS'])
@Controller({ path: '/actions', version: '1' })
export class ActionsControllerV1 {
  constructor(private readonly actionService: ActionsService) {}

  @Get()
  public async getAllActions(): Promise<string[]> {
    const actions: Action[] = await this.actionService.getAllActions();
    return actions.map((action) => action.name);
  }

  @Post('/:name')
  @RequiredActions(['MANAGE_PERMISSIONS'])
  public addAction(@Param('name') name: string): void {
    this.actionService.createAction(name);
  }

  @Delete('/:name')
  @RequiredActions(['MANAGE_PERMISSIONS'])
  public deleteAction(@Param('name') name: string): Promise<DeleteResult> {
    return this.actionService.deleteAction(name);
  }
}
