import { ApolloError } from 'apollo-server';
import { EntityManager } from 'typeorm';
import { GRAPHQL_ERRORS } from '../utils/constants';
import { User, Post, POST_FIELD_MAP, Feature } from '../entity';
import { applyEqCriteria, applyInCriteria, applyOrderBy } from '../utils/collection';
import {
  QueryResolvers,
  Post as PostModel,
  MutationResolvers,
  UpdatePostInput,
  CreatePostInput
} from '../generated/types';
import { calculateSlug } from '../utils/string';

const convertInputToModel = async <I extends CreatePostInput | UpdatePostInput>(
  input: I,
  post: Post,
  manager: EntityManager
) => {
  post.title = input.title;
  post.content = input.content;
  post.published = !!input.published;
  if (input.publishedAt) {
    post.publishedAt = new Date(input.publishedAt);
  } else {
    post.publishedAt = input.published ? new Date() : null;
  }
  post.mainImage = input.mainImage;
  post.slug = input.slug || calculateSlug(input.title);
  post.features = await manager.findByIds(Feature, input.features);
};

const createPost: MutationResolvers['createPost'] = async (_, { input }, { manager, userId }) => {
  if (!input.title) {
    throw new ApolloError('Title is missing', GRAPHQL_ERRORS.INVALID_INPUT);
  }
  const user = await manager.findOneOrFail(User, { id: userId });
  try {
    const post = new Post();

    await convertInputToModel<CreatePostInput>(input, post, manager);

    post.author = user;
    post.createdAt = new Date();

    return ((await manager.save(post)) as any) as PostModel;
  } catch (error) {
    console.error(error);
    throw new ApolloError('Could not create a post');
  }
};

export const updatePost: MutationResolvers['updatePost'] = async (_, { input }, { manager }) => {
  if (!input.id || !input.title) {
    throw new ApolloError('Id or Title is missing', GRAPHQL_ERRORS.INVALID_INPUT);
  }
  try {
    const post = await manager.findOneOrFail(Post, { id: input.id });

    await convertInputToModel<UpdatePostInput>(input, post, manager);

    return ((await manager.save(post)) as any) as PostModel;
  } catch (error) {
    console.error(error);
    throw new ApolloError('Could not update a post');
  }
};

export const deletePost: MutationResolvers['deletePost'] = async (_, { id }, { manager }) => {
  try {
    if (!id) {
      throw new ApolloError('Missing id', GRAPHQL_ERRORS.INVALID_INPUT);
    }

    const post = await manager.findOneOrFail(Post, { id });

    await manager.delete(Post, { id: post.id });

    return {
      ok: true
    };
  } catch (error) {
    console.error(error);
    throw new ApolloError('Post could not be deleted');
  }
};

export const posts: QueryResolvers['posts'] = async (
  _,
  { offset, limit, sortBy, sortDir, filter },
  { manager }
) => {
  let query = manager
    .getRepository(Post)
    .createQueryBuilder('post')
    .innerJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.features', 'feature')
    .skip(offset)
    .take(limit);

  if (filter && typeof filter.PUBLISHED === 'boolean') {
    query = applyEqCriteria(query, `post.published`, filter.PUBLISHED);
  }

  query = applyInCriteria(query, 'post.id', filter?.ID);
  query = applyInCriteria(query, 'feature.id', filter?.FEATURES, true);
  if (sortBy) {
    query = applyOrderBy(query, `post.${POST_FIELD_MAP[sortBy]}`, sortDir);
  }

  const [items, total] = await query.getManyAndCount();

  return {
    total,
    items: (items as any) as PostModel[]
  };
};

const post: QueryResolvers['post'] = async (_, { id }, { manager }) => {
  const retrievedPost = (await (manager
    .getRepository(Post)
    .createQueryBuilder('post')
    .innerJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.features', 'feature')
    .orWhere('post.id = :id', { id })
    .orWhere('post.slug = :id', { id })
    .getOne() as any)) as PostModel;

  if (!retrievedPost) {
    throw new ApolloError('Could not find a blog post.', GRAPHQL_ERRORS.NOT_FOUND);
  }

  return retrievedPost;
};

export const Query = {
  post,
  posts
};
export const Mutation = {
  createPost,
  updatePost,
  deletePost
};

export const Types = {
  Post: {
    features(model: PostModel) {
      return model.features || [];
    }
  }
};
