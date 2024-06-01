// permissions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}

  async getAllActions(): Promise<Action[]> {
    return this.actionRepository.find();
  }

  async createAction(actionName: string): Promise<Action> {
    const action = new Action();
    action.name = actionName;
    await this.actionRepository.save(action);

    return action;
  }

  async deleteAction(actionName: string): Promise<DeleteResult> {
    const action = await this.actionRepository.delete({
      name: actionName,
    });

    return action;
  }
}
