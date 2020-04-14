import { rule, shield, and } from 'graphql-shield';
import { AuthenticationError } from 'apollo-server';
import { Context } from './static-types';
import { User } from './entity';
import { Role } from './generated/types';

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, { token }: Context) => {
  const expiresAt = token ? token.exp : 0;
  if (expiresAt * 1000 > Date.now()) {
    return true;
  }
  return new AuthenticationError('Your session has expired!');
});

const isSystemAdmin = rule({ cache: 'contextual' })(async (_, __, { manager, userId }: Context) => {
  const user = await manager.findOne(User, userId);
  return user.role === Role.SUPER_ADMIN;
});

const permissions = shield(
  {
    Query: {
      users: isAuthenticated,
      viewer: isAuthenticated,
      leads: isAuthenticated
    },
    Mutation: {
      createUser: isAuthenticated,
      deleteUser: isAuthenticated,
      createPost: isAuthenticated,
      deletePost: isAuthenticated,
      uploadImage: isAuthenticated,
      createCompany: isAuthenticated,
      deleteCompany: isAuthenticated,
      updateCompany: isAuthenticated,
      createFeature: isAuthenticated,
      deleteFeature: isAuthenticated,
      updateFeature: isAuthenticated,
      deleteLead: isAuthenticated,
      purgeUnusedImages: and(isAuthenticated, isSystemAdmin)
    }
  },
  {
    allowExternalErrors: true,
    fallbackError: new AuthenticationError('Your session is invalid. Please sign in.')
  }
);

export default permissions;
