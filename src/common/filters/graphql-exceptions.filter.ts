import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(GraphQLError)
export class GraphQLExceptionsFilter implements GqlExceptionFilter {
  catch(exception: GraphQLError) {
    if (exception.extensions.code === 'INTERNAL_SERVER_ERROR') console.log(exception);
    return exception;
  }
}
