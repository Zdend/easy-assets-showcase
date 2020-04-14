import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../static-types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Upload: any,
};

export type Address = {
  id: Scalars['ID'],
  suburb: Scalars['String'],
  postcode: Scalars['String'],
  state: AuState,
  city: AuCity,
  lat?: Maybe<Scalars['Float']>,
  long?: Maybe<Scalars['Float']>,
};

export type AddressCollection = {
  total: Scalars['Int'],
  items: Array<Address>,
};

export enum AddressField {
  POSTCODE = 'POSTCODE',
  SUBURB = 'SUBURB',
  STATE = 'STATE',
  CITY = 'CITY'
}

export type AddressFilter = {
  SEARCH?: Maybe<Scalars['String']>,
  ID?: Maybe<StringCriteria>,
};

export enum AuCity {
  SYDNEY = 'SYDNEY',
  MELBOURNE = 'MELBOURNE',
  BRISBANE = 'BRISBANE',
  HOBART = 'HOBART',
  DARWIN = 'DARWIN',
  CAIRNS = 'CAIRNS',
  PERTH = 'PERTH',
  ADELAIDE = 'ADELAIDE',
  CANBERRA = 'CANBERRA',
  OTHER = 'OTHER'
}

export enum AudienceType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
  INDIVIDUAL_BUSINESS = 'INDIVIDUAL_BUSINESS'
}

/** ADDRESS */
export enum AuState {
  NSW = 'NSW',
  VIC = 'VIC',
  ACT = 'ACT',
  QLD = 'QLD',
  TAS = 'TAS',
  WA = 'WA',
  NT = 'NT',
  SA = 'SA',
  OTHER = 'OTHER'
}

export type Company = {
  id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
  logo?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  type: AudienceType,
  serviceType?: Maybe<CompanyServiceType>,
  premium: Scalars['Boolean'],
  affiliateUrl?: Maybe<Scalars['String']>,
  websiteUrl?: Maybe<Scalars['String']>,
  features: Array<Feature>,
  manager?: Maybe<User>,
  addresses: Array<Address>,
  languages: Array<Language>,
  status: CompanyStatus,
  pricing?: Maybe<Scalars['String']>,
  tags: Array<CompanyTag>,
};

export type CompanyCollection = {
  total: Scalars['Int'],
  items: Array<Company>,
};

export enum CompanyField {
  NAME = 'NAME',
  TYPE = 'TYPE',
  CREATED_AT = 'CREATED_AT',
  SERVICE_TYPE = 'SERVICE_TYPE',
  LANGUAGES = 'LANGUAGES',
  FEATURES = 'FEATURES',
  PREMIUM = 'PREMIUM',
  ADDRESS_CITY = 'ADDRESS_CITY',
  STATUS = 'STATUS',
  FEATURE_TAG = 'FEATURE_TAG',
  PRICING = 'PRICING',
  COMPANY_TAG = 'COMPANY_TAG'
}

export type CompanyFilter = {
  ID?: Maybe<StringCriteria>,
  SEARCH?: Maybe<Scalars['String']>,
  FEATURES?: Maybe<StringCriteria>,
  TYPE?: Maybe<StringCriteria>,
  LANGUAGES?: Maybe<StringCriteria>,
  SERVICE_TYPE?: Maybe<StringCriteria>,
  ADDRESS_CITY?: Maybe<StringCriteria>,
  STATUS?: Maybe<StringCriteria>,
  FEATURE_TAG?: Maybe<StringCriteria>,
  COMPANY_TAG?: Maybe<StringCriteria>,
};

export enum CompanyServiceType {
  ONLINE = 'ONLINE',
  FACE_TO_FACE = 'FACE_TO_FACE',
  ALL = 'ALL'
}

export enum CompanyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE'
}

export enum CompanyTag {
  TAX_RETURN = 'TAX_RETURN'
}

export type CreateCompanyInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  logo?: Maybe<Scalars['String']>,
  type: AudienceType,
  serviceType?: Maybe<CompanyServiceType>,
  premium: Scalars['Boolean'],
  affiliateUrl?: Maybe<Scalars['String']>,
  websiteUrl?: Maybe<Scalars['String']>,
  features: Array<Scalars['ID']>,
  addresses: Array<Scalars['ID']>,
  languages: Array<Language>,
  manager?: Maybe<Scalars['ID']>,
  status: CompanyStatus,
  pricing?: Maybe<Scalars['String']>,
  tags: Array<CompanyTag>,
};

export type CreateFeatureInput = {
  name: Scalars['String'],
  type?: Maybe<AudienceType>,
  description?: Maybe<Scalars['String']>,
  tags: Array<FeatureTag>,
};

export type CreateLeadInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  phoneNumber?: Maybe<Scalars['String']>,
  city?: Maybe<AuCity>,
  requirements?: Maybe<Scalars['String']>,
  companyName?: Maybe<Scalars['String']>,
  companies?: Maybe<Array<Scalars['ID']>>,
};

export type CreateLeadPayload = {
  lead: Lead,
};

export type CreatePostInput = {
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
  published?: Maybe<Scalars['Boolean']>,
  publishedAt?: Maybe<Scalars['DateTime']>,
  mainImage?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  features: Array<Scalars['ID']>,
};

export type CreateUserInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
};


export type Feature = {
  id: Scalars['ID'],
  name: Scalars['String'],
  slug?: Maybe<Scalars['String']>,
  type?: Maybe<AudienceType>,
  description?: Maybe<Scalars['String']>,
  tags: Array<FeatureTag>,
};

export type FeatureCollection = {
  total: Scalars['Int'],
  items: Array<Feature>,
};

export enum FeatureTag {
  TAX_RETURN = 'TAX_RETURN'
}

/** GENERIC TYPES */
export type File = {
  url: Scalars['String'],
};

export enum Language {
  ENGLISH = 'ENGLISH',
  MANDARIN = 'MANDARIN',
  HINDI = 'HINDI',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  STANDARD_ARABIC = 'STANDARD_ARABIC',
  BENGALI = 'BENGALI',
  RUSSIAN = 'RUSSIAN',
  PORTUGESE = 'PORTUGESE',
  INDONESIAN = 'INDONESIAN',
  URDU = 'URDU',
  GERMAN = 'GERMAN',
  JAPANESE = 'JAPANESE',
  SWAHILI = 'SWAHILI',
  MARATHI = 'MARATHI',
  TELUGU = 'TELUGU',
  PUNJABI = 'PUNJABI',
  WU_CHINESE = 'WU_CHINESE',
  TAMIL = 'TAMIL',
  TURKISH = 'TURKISH',
  KOREAN = 'KOREAN',
  VIETNAMESE = 'VIETNAMESE',
  CANTONESE = 'CANTONESE',
  JAVANESE = 'JAVANESE',
  ITALIAN = 'ITALIAN',
  EGYPTIAN_ARABIC = 'EGYPTIAN_ARABIC',
  HAUSA = 'HAUSA',
  THAI = 'THAI',
  GUJARATI = 'GUJARATI',
  KANNADA = 'KANNADA',
  PERSIAN = 'PERSIAN',
  BHOJPURI = 'BHOJPURI',
  SOUTHERN_MIN = 'SOUTHERN_MIN',
  FILIPINO = 'FILIPINO',
  POLISH = 'POLISH',
  YORUBA = 'YORUBA',
  MALAYALAM = 'MALAYALAM',
  ODIA = 'ODIA',
  MAITHILI = 'MAITHILI',
  BURMESE = 'BURMESE',
  SUNDA = 'SUNDA',
  SUDANESE_ARABIC = 'SUDANESE_ARABIC',
  ALGERIAN_ARABIC = 'ALGERIAN_ARABIC',
  MOROCCAN_ARABIC = 'MOROCCAN_ARABIC',
  UKRAINIAN = 'UKRAINIAN',
  IGBO = 'IGBO',
  NORTHERN_UZBEK = 'NORTHERN_UZBEK',
  SINDHI = 'SINDHI',
  ROMANIAN = 'ROMANIAN',
  TAGALOG = 'TAGALOG',
  DUTCH = 'DUTCH',
  AMHARIC = 'AMHARIC',
  MALAY = 'MALAY',
  NEPALI = 'NEPALI',
  GREEK = 'GREEK',
  KAZAKH = 'KAZAKH',
  DECCAN = 'DECCAN',
  HUNGARIAN = 'HUNGARIAN',
  ZULU = 'ZULU',
  RUNDI = 'RUNDI',
  CZECH = 'CZECH'
}

/** LEAD */
export type Lead = {
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['DateTime'],
  phoneNumber?: Maybe<Scalars['String']>,
  city?: Maybe<AuCity>,
  requirements?: Maybe<Scalars['String']>,
  companyName?: Maybe<Scalars['String']>,
  companies: Array<Company>,
};

export type LeadCollection = {
  total: Scalars['Int'],
  items: Array<Lead>,
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginPayload = {
  viewer: Viewer,
};

export type Mutation = {
  login?: Maybe<LoginPayload>,
  logout?: Maybe<SimpleResponsePayload>,
  forgotPassword?: Maybe<SimpleResponsePayload>,
  resetPassword?: Maybe<SimpleResponsePayload>,
  createUser?: Maybe<User>,
  deleteUser?: Maybe<SimpleResponsePayload>,
  deletePost?: Maybe<SimpleResponsePayload>,
  createPost?: Maybe<Post>,
  updatePost?: Maybe<Post>,
  createCompany?: Maybe<Company>,
  deleteCompany?: Maybe<SimpleResponsePayload>,
  updateCompany?: Maybe<Company>,
  createFeature?: Maybe<Feature>,
  deleteFeature?: Maybe<SimpleResponsePayload>,
  updateFeature?: Maybe<Feature>,
  createLead?: Maybe<CreateLeadPayload>,
  deleteLead?: Maybe<SimpleResponsePayload>,
  updateLead?: Maybe<UpdateLeadPayload>,
  uploadImage: File,
  purgeUnusedImages?: Maybe<PurgeUnusedImagesPayload>,
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']
};


export type MutationCreatePostArgs = {
  input: CreatePostInput
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['ID']
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput
};


export type MutationCreateFeatureArgs = {
  input: CreateFeatureInput
};


export type MutationDeleteFeatureArgs = {
  id: Scalars['ID']
};


export type MutationUpdateFeatureArgs = {
  input: UpdateFeatureInput
};


export type MutationCreateLeadArgs = {
  input: CreateLeadInput
};


export type MutationDeleteLeadArgs = {
  id: Scalars['ID']
};


export type MutationUpdateLeadArgs = {
  input: UpdateLeadInput
};


export type MutationUploadImageArgs = {
  image: Scalars['Upload'],
  folder: UploadFolder
};


export type MutationPurgeUnusedImagesArgs = {
  dryRun?: Maybe<Scalars['Boolean']>
};

export type Post = {
  id: Scalars['ID'],
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
  author: User,
  createdAt: Scalars['DateTime'],
  publishedAt?: Maybe<Scalars['DateTime']>,
  published: Scalars['Boolean'],
  mainImage?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  features: Array<Feature>,
};

export type PostCollection = {
  total: Scalars['Int'],
  items: Array<Post>,
};

export enum PostField {
  TITLE = 'TITLE',
  CREATED_AT = 'CREATED_AT',
  PUBLISHED_AT = 'PUBLISHED_AT',
  PUBLISHED = 'PUBLISHED',
  FEATURES = 'FEATURES'
}

export type PostFilter = {
  PUBLISHED?: Maybe<Scalars['Boolean']>,
  ID?: Maybe<StringCriteria>,
  FEATURES?: Maybe<StringCriteria>,
};

export type PurgeUnusedImagesPayload = {
  storedImagesCount: Scalars['Int'],
  unusedImagesCount: Scalars['Int'],
  deletedImagesCount: Scalars['Int'],
};

export type Query = {
  users: Array<User>,
  viewer: Viewer,
  posts: PostCollection,
  post: Post,
  company: Company,
  companies: CompanyCollection,
  feature: Feature,
  features: FeatureCollection,
  addresses: AddressCollection,
  lead: Lead,
  leads: LeadCollection,
};


export type QueryPostsArgs = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  sortBy?: Maybe<PostField>,
  sortDir?: Maybe<SortDirection>,
  filter?: Maybe<PostFilter>
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryCompanyArgs = {
  id: Scalars['ID']
};


export type QueryCompaniesArgs = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  sortBy?: Maybe<CompanyField>,
  sortDir?: Maybe<SortDirection>,
  filter?: Maybe<CompanyFilter>
};


export type QueryFeatureArgs = {
  id: Scalars['ID']
};


export type QueryFeaturesArgs = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryAddressesArgs = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  sortBy?: Maybe<AddressField>,
  sortDir?: Maybe<SortDirection>,
  filter?: Maybe<AddressFilter>
};


export type QueryLeadArgs = {
  id: Scalars['ID']
};


export type QueryLeadsArgs = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};

export type ResetPasswordInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  token: Scalars['String'],
};

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_MANAGER = 'COMPANY_MANAGER'
}

export type SimpleResponsePayload = {
  ok: Scalars['Boolean'],
};

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type StringCriteria = {
  notIn?: Maybe<Array<Scalars['String']>>,
  in?: Maybe<Array<Scalars['String']>>,
};

export type UpdateCompanyInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  logo?: Maybe<Scalars['String']>,
  type: AudienceType,
  serviceType?: Maybe<CompanyServiceType>,
  premium: Scalars['Boolean'],
  affiliateUrl?: Maybe<Scalars['String']>,
  websiteUrl?: Maybe<Scalars['String']>,
  features: Array<Scalars['ID']>,
  addresses: Array<Scalars['ID']>,
  languages: Array<Language>,
  manager?: Maybe<Scalars['ID']>,
  status: CompanyStatus,
  pricing?: Maybe<Scalars['String']>,
  tags: Array<CompanyTag>,
};

export type UpdateFeatureInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  type?: Maybe<AudienceType>,
  description?: Maybe<Scalars['String']>,
  tags: Array<FeatureTag>,
};

export type UpdateLeadInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>,
  city?: Maybe<AuCity>,
  requirements?: Maybe<Scalars['String']>,
  companyName?: Maybe<Scalars['String']>,
  companies?: Maybe<Array<Scalars['ID']>>,
};

export type UpdateLeadPayload = {
  lead: Lead,
};

export type UpdatePostInput = {
  id: Scalars['ID'],
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
  published?: Maybe<Scalars['Boolean']>,
  publishedAt?: Maybe<Scalars['DateTime']>,
  mainImage?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  features: Array<Scalars['ID']>,
};


export enum UploadFolder {
  POST = 'POST',
  COMPANY = 'COMPANY'
}

export type User = {
  id: Scalars['ID'],
  email: Scalars['String'],
  name: Scalars['String'],
  role?: Maybe<Role>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};

/** AUTH */
export type Viewer = {
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Role: Role,
  Viewer: ResolverTypeWrapper<Viewer>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  PostField: PostField,
  SortDirection: SortDirection,
  PostFilter: PostFilter,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  StringCriteria: StringCriteria,
  PostCollection: ResolverTypeWrapper<PostCollection>,
  Post: ResolverTypeWrapper<Post>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Feature: ResolverTypeWrapper<Feature>,
  AudienceType: AudienceType,
  FeatureTag: FeatureTag,
  Company: ResolverTypeWrapper<Company>,
  CompanyServiceType: CompanyServiceType,
  Address: ResolverTypeWrapper<Address>,
  AuState: AuState,
  AuCity: AuCity,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Language: Language,
  CompanyStatus: CompanyStatus,
  CompanyTag: CompanyTag,
  CompanyField: CompanyField,
  CompanyFilter: CompanyFilter,
  CompanyCollection: ResolverTypeWrapper<CompanyCollection>,
  FeatureCollection: ResolverTypeWrapper<FeatureCollection>,
  AddressField: AddressField,
  AddressFilter: AddressFilter,
  AddressCollection: ResolverTypeWrapper<AddressCollection>,
  Lead: ResolverTypeWrapper<Lead>,
  LeadCollection: ResolverTypeWrapper<LeadCollection>,
  Mutation: ResolverTypeWrapper<{}>,
  LoginInput: LoginInput,
  LoginPayload: ResolverTypeWrapper<LoginPayload>,
  SimpleResponsePayload: ResolverTypeWrapper<SimpleResponsePayload>,
  ResetPasswordInput: ResetPasswordInput,
  CreateUserInput: CreateUserInput,
  CreatePostInput: CreatePostInput,
  UpdatePostInput: UpdatePostInput,
  CreateCompanyInput: CreateCompanyInput,
  UpdateCompanyInput: UpdateCompanyInput,
  CreateFeatureInput: CreateFeatureInput,
  UpdateFeatureInput: UpdateFeatureInput,
  CreateLeadInput: CreateLeadInput,
  CreateLeadPayload: ResolverTypeWrapper<CreateLeadPayload>,
  UpdateLeadInput: UpdateLeadInput,
  UpdateLeadPayload: ResolverTypeWrapper<UpdateLeadPayload>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  UploadFolder: UploadFolder,
  File: ResolverTypeWrapper<File>,
  PurgeUnusedImagesPayload: ResolverTypeWrapper<PurgeUnusedImagesPayload>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: User,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Role: Role,
  Viewer: Viewer,
  Int: Scalars['Int'],
  PostField: PostField,
  SortDirection: SortDirection,
  PostFilter: PostFilter,
  Boolean: Scalars['Boolean'],
  StringCriteria: StringCriteria,
  PostCollection: PostCollection,
  Post: Post,
  DateTime: Scalars['DateTime'],
  Feature: Feature,
  AudienceType: AudienceType,
  FeatureTag: FeatureTag,
  Company: Company,
  CompanyServiceType: CompanyServiceType,
  Address: Address,
  AuState: AuState,
  AuCity: AuCity,
  Float: Scalars['Float'],
  Language: Language,
  CompanyStatus: CompanyStatus,
  CompanyTag: CompanyTag,
  CompanyField: CompanyField,
  CompanyFilter: CompanyFilter,
  CompanyCollection: CompanyCollection,
  FeatureCollection: FeatureCollection,
  AddressField: AddressField,
  AddressFilter: AddressFilter,
  AddressCollection: AddressCollection,
  Lead: Lead,
  LeadCollection: LeadCollection,
  Mutation: {},
  LoginInput: LoginInput,
  LoginPayload: LoginPayload,
  SimpleResponsePayload: SimpleResponsePayload,
  ResetPasswordInput: ResetPasswordInput,
  CreateUserInput: CreateUserInput,
  CreatePostInput: CreatePostInput,
  UpdatePostInput: UpdatePostInput,
  CreateCompanyInput: CreateCompanyInput,
  UpdateCompanyInput: UpdateCompanyInput,
  CreateFeatureInput: CreateFeatureInput,
  UpdateFeatureInput: UpdateFeatureInput,
  CreateLeadInput: CreateLeadInput,
  CreateLeadPayload: CreateLeadPayload,
  UpdateLeadInput: UpdateLeadInput,
  UpdateLeadPayload: UpdateLeadPayload,
  Upload: Scalars['Upload'],
  UploadFolder: UploadFolder,
  File: File,
  PurgeUnusedImagesPayload: PurgeUnusedImagesPayload,
};

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  suburb?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  postcode?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  state?: Resolver<ResolversTypes['AuState'], ParentType, ContextType>,
  city?: Resolver<ResolversTypes['AuCity'], ParentType, ContextType>,
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  long?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
};

export type AddressCollectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AddressCollection'] = ResolversParentTypes['AddressCollection']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>,
};

export type CompanyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['AudienceType'], ParentType, ContextType>,
  serviceType?: Resolver<Maybe<ResolversTypes['CompanyServiceType']>, ParentType, ContextType>,
  premium?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  affiliateUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  websiteUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  features?: Resolver<Array<ResolversTypes['Feature']>, ParentType, ContextType>,
  manager?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>,
  languages?: Resolver<Array<ResolversTypes['Language']>, ParentType, ContextType>,
  status?: Resolver<ResolversTypes['CompanyStatus'], ParentType, ContextType>,
  pricing?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Array<ResolversTypes['CompanyTag']>, ParentType, ContextType>,
};

export type CompanyCollectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CompanyCollection'] = ResolversParentTypes['CompanyCollection']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>,
};

export type CreateLeadPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateLeadPayload'] = ResolversParentTypes['CreateLeadPayload']> = {
  lead?: Resolver<ResolversTypes['Lead'], ParentType, ContextType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FeatureResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['AudienceType']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Array<ResolversTypes['FeatureTag']>, ParentType, ContextType>,
};

export type FeatureCollectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FeatureCollection'] = ResolversParentTypes['FeatureCollection']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['Feature']>, ParentType, ContextType>,
};

export type FileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type LeadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Lead'] = ResolversParentTypes['Lead']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  city?: Resolver<Maybe<ResolversTypes['AuCity']>, ParentType, ContextType>,
  requirements?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>,
};

export type LeadCollectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LeadCollection'] = ResolversParentTypes['LeadCollection']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['Lead']>, ParentType, ContextType>,
};

export type LoginPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  viewer?: Resolver<ResolversTypes['Viewer'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<Maybe<ResolversTypes['LoginPayload']>, ParentType, ContextType, MutationLoginArgs>,
  logout?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType>,
  forgotPassword?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>,
  resetPassword?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'input'>>,
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>,
  deleteUser?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
  deletePost?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>,
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>,
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input'>>,
  createCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'input'>>,
  deleteCompany?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType, RequireFields<MutationDeleteCompanyArgs, 'id'>>,
  updateCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationUpdateCompanyArgs, 'input'>>,
  createFeature?: Resolver<Maybe<ResolversTypes['Feature']>, ParentType, ContextType, RequireFields<MutationCreateFeatureArgs, 'input'>>,
  deleteFeature?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType, RequireFields<MutationDeleteFeatureArgs, 'id'>>,
  updateFeature?: Resolver<Maybe<ResolversTypes['Feature']>, ParentType, ContextType, RequireFields<MutationUpdateFeatureArgs, 'input'>>,
  createLead?: Resolver<Maybe<ResolversTypes['CreateLeadPayload']>, ParentType, ContextType, RequireFields<MutationCreateLeadArgs, 'input'>>,
  deleteLead?: Resolver<Maybe<ResolversTypes['SimpleResponsePayload']>, ParentType, ContextType, RequireFields<MutationDeleteLeadArgs, 'id'>>,
  updateLead?: Resolver<Maybe<ResolversTypes['UpdateLeadPayload']>, ParentType, ContextType, RequireFields<MutationUpdateLeadArgs, 'input'>>,
  uploadImage?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'image' | 'folder'>>,
  purgeUnusedImages?: Resolver<Maybe<ResolversTypes['PurgeUnusedImagesPayload']>, ParentType, ContextType, RequireFields<MutationPurgeUnusedImagesArgs, 'dryRun'>>,
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  mainImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  features?: Resolver<Array<ResolversTypes['Feature']>, ParentType, ContextType>,
};

export type PostCollectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostCollection'] = ResolversParentTypes['PostCollection']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>,
};

export type PurgeUnusedImagesPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PurgeUnusedImagesPayload'] = ResolversParentTypes['PurgeUnusedImagesPayload']> = {
  storedImagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  unusedImagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  deletedImagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  viewer?: Resolver<ResolversTypes['Viewer'], ParentType, ContextType>,
  posts?: Resolver<ResolversTypes['PostCollection'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'offset' | 'limit' | 'sortDir'>>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QueryCompanyArgs, 'id'>>,
  companies?: Resolver<ResolversTypes['CompanyCollection'], ParentType, ContextType, RequireFields<QueryCompaniesArgs, 'offset' | 'limit' | 'sortDir'>>,
  feature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<QueryFeatureArgs, 'id'>>,
  features?: Resolver<ResolversTypes['FeatureCollection'], ParentType, ContextType, RequireFields<QueryFeaturesArgs, 'offset' | 'limit'>>,
  addresses?: Resolver<ResolversTypes['AddressCollection'], ParentType, ContextType, RequireFields<QueryAddressesArgs, 'offset' | 'limit' | 'sortDir'>>,
  lead?: Resolver<ResolversTypes['Lead'], ParentType, ContextType, RequireFields<QueryLeadArgs, 'id'>>,
  leads?: Resolver<ResolversTypes['LeadCollection'], ParentType, ContextType, RequireFields<QueryLeadsArgs, 'offset' | 'limit'>>,
};

export type SimpleResponsePayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SimpleResponsePayload'] = ResolversParentTypes['SimpleResponsePayload']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type UpdateLeadPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateLeadPayload'] = ResolversParentTypes['UpdateLeadPayload']> = {
  lead?: Resolver<ResolversTypes['Lead'], ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ViewerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = Context> = {
  Address?: AddressResolvers<ContextType>,
  AddressCollection?: AddressCollectionResolvers<ContextType>,
  Company?: CompanyResolvers<ContextType>,
  CompanyCollection?: CompanyCollectionResolvers<ContextType>,
  CreateLeadPayload?: CreateLeadPayloadResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Feature?: FeatureResolvers<ContextType>,
  FeatureCollection?: FeatureCollectionResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Lead?: LeadResolvers<ContextType>,
  LeadCollection?: LeadCollectionResolvers<ContextType>,
  LoginPayload?: LoginPayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  PostCollection?: PostCollectionResolvers<ContextType>,
  PurgeUnusedImagesPayload?: PurgeUnusedImagesPayloadResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SimpleResponsePayload?: SimpleResponsePayloadResolvers<ContextType>,
  UpdateLeadPayload?: UpdateLeadPayloadResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
  Viewer?: ViewerResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
