import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const RequestHeader = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    const { headers } = ctx.switchToHttp().getRequest();

    const dto = plainToInstance(value, headers, { excludeExtraneousValues: true });

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid request headers');
    }

    return dto;
  },
);
