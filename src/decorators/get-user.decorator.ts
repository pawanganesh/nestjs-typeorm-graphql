import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
  const request = GqlExecutionContext.create(context).getContext().req;
  if (data) request.user[data];
  return request.user;
});
