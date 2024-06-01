import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesControllerV1 } from './controllers/roles.controller.v1';
import { RolePermission } from './entities/role-permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Role])],
  controllers: [RolesControllerV1],
  providers: [RolesService],
})
export class RolesModule {}
