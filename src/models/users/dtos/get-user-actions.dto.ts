import { IsBoolean, IsOptional } from 'class-validator';

export class GetUserActionsQueryDto {
  @IsOptional()
  @IsBoolean()
  fullDetail?: boolean;
}
