import { IsString, MaxLength } from 'class-validator';

export class CreateActionDto {
  @IsString()
  @MaxLength(200)
  name: string;
}
