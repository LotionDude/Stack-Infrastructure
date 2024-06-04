import { Reflector } from '@nestjs/core';

export const RequiredActions = Reflector.createDecorator<string[]>();
