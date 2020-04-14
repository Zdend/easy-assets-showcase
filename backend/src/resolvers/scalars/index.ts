import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  parseValue(value) {
    return new global.Date(value); // value from the client
  },
  serialize(value) {
    // value sent to the client
    return value instanceof global.Date ? value.toISOString() : value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`DateTime: Can only validate strings but got a: ${ast.kind}`);
    }

    return new Date(ast.value); // ast value is always in string format
  }
});

// const __resolveType = (obj: { __typename: string }): string => obj.__typename;
