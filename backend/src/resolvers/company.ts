import { ApolloError } from 'apollo-server';
import { EntityManager } from 'typeorm';
import { GRAPHQL_ERRORS } from '../utils/constants';
import { Company, COMPANY_FIELD_MAP, User, Feature, Address, CompanyLanguage, CompanyTag } from '../entity';
import {
  applyInCriteria,
  applyOrderBy,
  addAnyTypeToStringCriteria,
  applySearchCriteria
} from '../utils/collection';
import {
  MutationResolvers,
  QueryResolvers,
  Company as CompanyModel,
  AudienceType,
  UpdateCompanyInput,
  CreateCompanyInput,
  CompanyServiceType,
  CompanyStatus
} from '../generated/types';
import { calculateSlug } from '../utils/string';

const convertInputToModel = async <I extends CreateCompanyInput | UpdateCompanyInput>(
  input: I,
  company: Company,
  manager: EntityManager
) => {
  company.name = input.name;
  company.slug = calculateSlug(input.name);
  company.description = input.description;
  company.logo = input.logo;
  company.affiliateUrl = input.affiliateUrl;
  company.websiteUrl = input.websiteUrl;
  company.premium = input.premium;
  company.type = input.type;
  company.serviceType = input.serviceType;
  company.status = input.status;
  company.pricing = input.pricing;
  company.manager = await manager.findOne(User, { id: input.manager });
  company.features = await manager.findByIds(Feature, input.features);
  company.addresses = await manager.findByIds(Address, input.addresses);

  await manager.remove(company.languages || []);

  company.languages = input.languages.map(inputLanguage => {
    const companyLanguage = new CompanyLanguage();
    companyLanguage.company = company;
    companyLanguage.language = inputLanguage;
    return companyLanguage;
  });

  await manager.remove(company.tags || []);

  company.tags = input.tags.map(inputTag => {
    const companyTag = new CompanyTag();
    companyTag.company = company;
    companyTag.tag = inputTag;
    return companyTag;
  });
};

const createCompany: MutationResolvers['createCompany'] = async (_, { input }, { manager }) => {
  if (!input.name) {
    throw new ApolloError('Name is missing', GRAPHQL_ERRORS.INVALID_INPUT);
  }

  try {
    const company = new Company();
    await convertInputToModel(input, company, manager);

    company.createdAt = new Date();

    return ((await manager.save(company)) as any) as CompanyModel;
  } catch (error) {
    console.error(error);
    throw new ApolloError('Could not create a company');
  }
};

const deleteCompany: MutationResolvers['deleteCompany'] = async (_, { id }, { manager }) => {
  try {
    if (!id) {
      throw new ApolloError('Missing id', GRAPHQL_ERRORS.INVALID_INPUT);
    }

    const company = await manager.findOneOrFail(
      Company,
      { id },
      {
        relations: ['languages', 'tags']
      }
    );

    await manager.remove(company.languages || []);
    await manager.remove(company.tags || []);

    await manager.delete(Company, { id: company.id });

    return {
      ok: true
    };
  } catch (error) {
    console.error(error);
    throw new ApolloError('Company could not be deleted');
  }
};

const updateCompany: MutationResolvers['updateCompany'] = async (_, { input }, { manager }) => {
  if (!input.id || !input.name) {
    throw new ApolloError('Id or Name is missing', GRAPHQL_ERRORS.INVALID_INPUT);
  }
  try {
    const company = await manager.findOneOrFail(
      Company,
      { id: input.id },
      {
        relations: ['languages', 'tags']
      }
    );

    await convertInputToModel(input, company, manager);

    return ((await manager.save(company)) as any) as CompanyModel;
  } catch (error) {
    console.error(error);
    throw new ApolloError('Could not update a company');
  }
};

const company: QueryResolvers['company'] = async (_, { id }, { manager }) => {
  const retrievedCompany = ((await manager
    .getRepository(Company)
    .createQueryBuilder('company')
    .leftJoinAndSelect('company.manager', 'manager')
    .leftJoinAndSelect('company.features', 'feature')
    .leftJoinAndSelect('company.addresses', 'address')
    .leftJoinAndSelect('company.languages', 'language')
    .leftJoinAndSelect('company.tags', 'companyTag')
    .orWhere('company.id = :id', { id })
    .orWhere('company.slug = :id', { id })
    .getOne()) as any) as CompanyModel;

  if (!retrievedCompany) {
    throw new ApolloError('Could not find company.', GRAPHQL_ERRORS.NOT_FOUND);
  }

  return retrievedCompany;
};

const companies: QueryResolvers['companies'] = async (
  _,
  { offset, limit, sortBy, sortDir, filter },
  { manager }
) => {
  let query = manager
    .getRepository(Company)
    .createQueryBuilder('company')
    .leftJoinAndSelect('company.features', 'feature')
    .leftJoinAndSelect('feature.tags', 'featureTag')
    .leftJoinAndSelect('company.languages', 'companyLanguage')
    .leftJoinAndSelect('company.addresses', 'address')
    .leftJoinAndSelect('company.tags', 'companyTag')
    .skip(offset)
    .take(limit);

  query = applyInCriteria(query, 'company.id', filter?.ID);
  query = applyInCriteria(query, 'feature.id', filter?.FEATURES);
  query = applyInCriteria(query, 'companyLanguage.language', filter?.LANGUAGES);
  query = applyInCriteria(query, 'company.status', filter?.STATUS);
  query = applyInCriteria(
    query,
    'company.type',
    addAnyTypeToStringCriteria(filter?.TYPE, AudienceType.INDIVIDUAL_BUSINESS)
  );
  query = applyInCriteria(
    query,
    'company.serviceType',
    addAnyTypeToStringCriteria(filter?.SERVICE_TYPE, CompanyServiceType.ALL)
  );
  query = applyInCriteria(query, 'address.city', filter?.ADDRESS_CITY);
  query = applyInCriteria(query, 'featureTag.tag', filter?.FEATURE_TAG);
  query = applyInCriteria(query, 'companyTag.tag', filter?.COMPANY_TAG);

  applySearchCriteria(
    query,
    ['company.name', 'company.type', 'company.serviceType', 'address.city'],
    filter?.SEARCH,
    true
  );

  if (sortBy) {
    query = applyOrderBy(query, `company.${COMPANY_FIELD_MAP[sortBy]}`, sortDir);
  }

  const [items, total] = await query.getManyAndCount();

  return {
    total,
    items: (items as any) as CompanyModel[]
  };
};

export const Types = {
  Company: {
    features(model: Company) {
      return model.features || [];
    },
    type(model: Company) {
      return model.type || AudienceType.INDIVIDUAL_BUSINESS;
    },
    status(model: Company) {
      return model.status || CompanyStatus.DRAFT;
    },
    addresses(model: Company) {
      return model.addresses || [];
    },
    languages(model: Company) {
      return (model.languages || []).map(companyLanguage => companyLanguage.language);
    },
    tags(model: Company) {
      return (model.tags || []).map(companyTag => companyTag.tag);
    }
  }
};
export const Query = {
  company,
  companies
};
export const Mutation = {
  createCompany,
  updateCompany,
  deleteCompany
};
