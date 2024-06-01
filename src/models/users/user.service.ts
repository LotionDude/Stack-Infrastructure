// permissions.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { Role } from '../roles/entities/roles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUser(name: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: name },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    user.roles.sort((a, b) => a.precedence - b.precedence);

    return user;
  }
}
