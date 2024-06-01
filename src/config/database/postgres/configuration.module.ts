import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Action } from '@/models/actions/entities/action.entity';
import { Role } from '@/models/roles/entities/roles.entity';
import { User } from '@/models/users/entities/user';
import { RolePermission } from '@/models/roles/entities/role-permission.entity';
import { UserRoles } from '@/models/users/entities/user-roles.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', // Type of your database
        host: config.get<string>('DATABASE_POSTGRES_HOST') ?? 'localhost',
        port: config.get<number>('DATABASE_POSTGRES_PORT') ?? 5432,
        username: config.get<string>('DATABASE_POSTGRES_USERNAME'),
        password: config.get<string>('DATABASE_POSTGRES_PASSWORD'),
        database: config.get<string>('DATABASE_POSTGRES_DATABSE'),
        ssl: true,
        entities: [Action, Role, User, RolePermission, UserRoles],
      }),
    }),
  ],
})
export class PostgresModule {}
