import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform<string, boolean> {
  private readonly defaultValue: boolean;

  constructor(defaultValue?: boolean) {
    this.defaultValue = defaultValue;
  }

  transform(value: string, metadata: ArgumentMetadata): boolean {
    if (value === 'true' || value === 'false') {
      return value === 'true';
    } else if (
      (value == null || undefined) &&
      this.defaultValue !== undefined
    ) {
      return this.defaultValue;
    }

    // TODO: the fieldname currently also includes the value. Need a fix!
    const { data: fieldName } = metadata;
    throw new BadRequestException(
      `Field "${fieldName} ${value}" is not a boolean.`,
    );
  }
}
