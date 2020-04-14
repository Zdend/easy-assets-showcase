import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { parse } from 'cookie';
import { Query, Mutation, Types } from './resolvers';
import typeDefs from './type-defs';
import ORMConfig from '../ormconfig';
import PermissionMiddleware from './permissions';
import { TOKEN_COOKIE } from './utils/constants';
import { parseToken } from './utils/auth';

const resolvers = { Query, Mutation, ...Types };

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  PermissionMiddleware
);

const apolloConfig = {
  schema,
  cors: {
    credentials: true,
    // TODO For the local development you can use current IP
    origin: process.env.FRONTEND_URL
  },
  formatError(error) {
    // console.error(error)
    return error;
  }
};

async function start() {
  const connection = await createConnection(ORMConfig);
  const server = new ApolloServer({
    context: ({ req, res }) => {
      const cookies = parse(req?.headers?.cookie || '');
      const token = parseToken(cookies[TOKEN_COOKIE]);
      return {
        connection,
        manager: connection.manager,
        cookies,
        token,
        userId: token ? token.userId : null,
        req,
        res
      };
    },
    ...apolloConfig
  });

  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀 Server ready at ${url}`);
}

try {
  start();
} catch (e) {
  console.error('Server could not be started!!!', e);
}
