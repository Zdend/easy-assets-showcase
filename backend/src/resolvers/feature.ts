import { ApolloError } from 'apollo-server';
import { Context } from '../static-types';
import { GRAPHQL_ERRORS } from '../utils/constants';
import { Feature, FeatureTag } from '../entity';
import {
  QueryResolvers,
  Feature as FeatureModel,
  MutationResolvers,
  CreateFeatureInput,
  UpdateFeatureInput
} from '../generated/types';
import { calculateSlug } from '../utils/string';
import { EntityManager } from 'typeorm';

const convertInputToModel = async <I extends CreateFeatureInput | UpdateFeatureInput>(
  input: I,
  feature: Feature,
  manager: EntityManager,
) => {
  feature.name = input.name;
  feature.type = input.type;
  feature.description = input.description;
  feature.slug = calculateSlug(input.name);

  await manager.remove(feature.tags || []);

  feature.tags = input.tags.map(featureTagInput => {
    const featureTag = new FeatureTag();
    featureTag.feature = feature;
    featureTag.tag = featureTagInput;
    return featureTag;
  });
};

const createFeature: MutationResolvers['createFeature'] = async (_, { input }, { manager }) => {
  if (!input.name) {
    throw new ApolloError('Name is missing', GRAPHQL_ERRORS.INVALID_INPUT);
  }
  try {
    const feature = new Feature();
    convertInputToModel(input, feature, manager);

    return ((await manager.save(Feature, feature)) as any) as FeatureModel;
  } catch (error) {
    console.error(error);
    throw new ApolloError('Could not create a feature');
  }
};

export const updateFeature: MutationResolvers['updateFeature'] = async (
  _,
  { input },
  { manager }
) => {
  if (!input.id || !input.name) {
    throw new ApolloError('Id or Name is missing', GRAPHQL_ERRORS.INVALID_INPUT);
  }
  try {
    const feature = await manager.findOneOrFail(Feature, { id: input.id }, {
      relations: ['tags']
    });
    convertInputToModel(input, feature, manager);
    return ((await manager.save(feature)) as any) as FeatureModel;
  } catch (error) {
    console.error(error);
    throw new ApolloError('Could not update a feature');
  }
};

export const deleteFeature: MutationResolvers['deleteFeature'] = async (_, { id }, { manager }) => {
  try {
    if (!id) {
      throw new ApolloError('Missing id', GRAPHQL_ERRORS.INVALID_INPUT);
    }

    const feature = await manager.findOneOrFail(Feature, { id }, {
      relations: ['tags']
    });

    await manager.remove(feature.tags || []);

    await manager.delete(Feature, { id: feature.id });

    return {
      ok: true
    };
  } catch (error) {
    console.error(error);
    throw new ApolloError('Feature could not be deleted');
  }
};

export const features: QueryResolvers['features'] = async (
  _,
  { offset, limit },
  { manager }: Context
) => {
  const query = manager
    .getRepository(Feature)
    .createQueryBuilder('feature')
    .skip(offset)
    .take(limit);

  const [items, total] = await query.getManyAndCount();

  return {
    total,
    items: (items as any) as FeatureModel[]
  };
};

const feature: QueryResolvers['feature'] = (_, { id }, { manager }) => {
  return (manager
    .getRepository(Feature)
    .createQueryBuilder('feature')
    .leftJoinAndSelect('feature.tags', 'tag')
    .orWhere('feature.id = :id', { id })
    .orWhere('feature.slug = :id', { id })
    .getOne() as any) as FeatureModel;
};

export const Query = {
  feature,
  features
};
export const Mutation = {
  createFeature,
  updateFeature,
  deleteFeature
};

export const Types = {
  Feature: {
    tags(model: Feature) {
      return (model.tags || []).map(featureTag => featureTag.tag);
    }
  }
};
