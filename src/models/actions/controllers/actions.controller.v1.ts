import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActionsService } from '../actions.service';
import { DeleteResult } from 'typeorm';
import { Action } from '../entities/action.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Actions')
@Controller({ path: '/actions', version: '1' })
export class ActionsControllerV1 {
  constructor(private readonly actionService: ActionsService) {}

  @Get()
  public async getAllActions(): Promise<string[]> {
    const actions: Action[] = await this.actionService.getAllActions();
    return actions.map((action) => action.name);
  }

  @Post('/:name')
  public addAction(@Param('name') name: string): void {
    this.actionService.createAction(name);
  }

  @Delete('/:name')
  public deleteAction(@Param('name') name: string): Promise<DeleteResult> {
    return this.actionService.deleteAction(name);
  }
}
