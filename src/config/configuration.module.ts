import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PostgresModule } from './database/postgres/configuration.module';

@Module({
  imports: [PostgresModule],
})
export class ConfigurationModule {}
