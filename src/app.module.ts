import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/configuration.module';
import { ActionsModule } from './models/actions/Actions.module';
import { RolesModule } from './models/roles/roles.module';
import { UserModule } from './models/users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './common/guards/permission.guard';

@Module({
  imports: [
    ConfigurationModule,
    ActionsModule,
    RolesModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
