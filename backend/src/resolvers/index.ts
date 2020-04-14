import * as Auth from './auth';
import * as User from './user';
import * as ScalarTypes from './scalars';
import * as Post from './post';
import * as Upload from './upload';
import * as Maintenance from './maintenance';
import * as Company from './company';
import * as Feature from './feature';
import * as Address from './address';
import * as Lead from './lead';

const resolvers = [Auth, User, Post, Company, Upload, Maintenance, Feature, Address, Lead];

export const Query = resolvers.reduce((queries, entity) => {
  return { ...queries, ...entity?.Query };
}, {});
export const Mutation = resolvers.reduce((mutations, entity) => {
  return { ...mutations, ...entity?.Mutation };
}, {});

export const Types = resolvers.reduce(
  (types, entity) => {
    return { ...types, ...entity?.Types };
  },
  {
    ...ScalarTypes
  }
);
