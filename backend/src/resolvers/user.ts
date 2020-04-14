import { ApolloError } from 'apollo-server';
import { generate } from 'shortid';
import { GRAPHQL_ERRORS } from '../utils/constants';
import { User } from '../entity';
import { sendUserSignedUp } from '../mail/user';
import { QueryResolvers, User as UserModel, MutationResolvers, Role } from '../generated/types';

const createUser: MutationResolvers['createUser'] = async (_, { input }, { manager }) => {
  if (!input.email || !input.firstName || !input.lastName) {
    throw new ApolloError(
      'Email, first name or last name is missing',
      GRAPHQL_ERRORS.INVALID_INPUT
    );
  }
  try {
    const existingUsers = await manager.find(User, { email: input.email });
    if (existingUsers && existingUsers.length) {
      throw new Error('A user with this email already exists!');
    }
    const resetPasswordToken = generate();
    const user = manager.create(User, { ...input, resetPasswordToken, role: Role.COMPANY_MANAGER });
    await manager.save(user);

    try {
      await sendUserSignedUp({
        firstName: user.firstName,
        email: user.email,
        token: resetPasswordToken
      });
    } catch (e) {
      console.error(e);
    }

    return (user as any) as UserModel;
  } catch (error) {
    console.error(error);
    throw new ApolloError('Could not create a user');
  }
};

const deleteUser: MutationResolvers['deleteUser'] = async (_, { id }, { manager }) => {
  try {
    if (!id) {
      throw new ApolloError('Missing id', GRAPHQL_ERRORS.INVALID_INPUT);
    }

    const user = await manager.findOneOrFail(User, { id });

    if (user.role === Role.SUPER_ADMIN) {
      throw new ApolloError('Super admin cannot be deleted');
    }

    await manager.delete(User, { id: user.id });

    return {
      ok: true
    };
  } catch (error) {
    console.error(error);
    throw new ApolloError('User could not be deleted');
  }
};

const users: QueryResolvers['users'] = (_, __, { manager }) => {
  return (manager.find(User) as any) as Promise<UserModel[]>;
};

export const Query = {
  users
};

export const Mutation = {
  createUser,
  deleteUser
};

export const Types = {};
