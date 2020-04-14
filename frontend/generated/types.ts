export type Maybe<T> = T | null;
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
   __typename?: 'Address',
  id: Scalars['ID'],
  suburb: Scalars['String'],
  postcode: Scalars['String'],
  state: AuState,
  city: AuCity,
  lat?: Maybe<Scalars['Float']>,
  long?: Maybe<Scalars['Float']>,
};

export type AddressCollection = {
   __typename?: 'AddressCollection',
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
   __typename?: 'Company',
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
   __typename?: 'CompanyCollection',
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
   __typename?: 'CreateLeadPayload',
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
   __typename?: 'Feature',
  id: Scalars['ID'],
  name: Scalars['String'],
  slug?: Maybe<Scalars['String']>,
  type?: Maybe<AudienceType>,
  description?: Maybe<Scalars['String']>,
  tags: Array<FeatureTag>,
};

export type FeatureCollection = {
   __typename?: 'FeatureCollection',
  total: Scalars['Int'],
  items: Array<Feature>,
};

export enum FeatureTag {
  TAX_RETURN = 'TAX_RETURN'
}

/** GENERIC TYPES */
export type File = {
   __typename?: 'File',
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
   __typename?: 'Lead',
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
   __typename?: 'LeadCollection',
  total: Scalars['Int'],
  items: Array<Lead>,
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginPayload = {
   __typename?: 'LoginPayload',
  viewer: Viewer,
};

export type Mutation = {
   __typename?: 'Mutation',
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
   __typename?: 'Post',
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
   __typename?: 'PostCollection',
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
   __typename?: 'PurgeUnusedImagesPayload',
  storedImagesCount: Scalars['Int'],
  unusedImagesCount: Scalars['Int'],
  deletedImagesCount: Scalars['Int'],
};

export type Query = {
   __typename?: 'Query',
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
   __typename?: 'SimpleResponsePayload',
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
   __typename?: 'UpdateLeadPayload',
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
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  name: Scalars['String'],
  role?: Maybe<Role>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};

/** AUTH */
export type Viewer = {
   __typename?: 'Viewer',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};
