export const isBrowser = typeof window !== 'undefined';
export const isDocker = process.env.BACKEND_URL === 'http://backend:4000/graphql';

export const PRODUCT_NAME = 'Easy Assets';

export const GOOGLE_TAG_MANAGER_ID = 'GTM-WGMGHZT';

export const masterColumnLayout = {
  xs: 24,
  lg: 20,
  xl: 16,
  xxl: 14
};

export const DEFAULT_DESCRIPTION = `Looking for the right account for you? ${PRODUCT_NAME} helps you find an accountant for you or your business that fits your needs across Australia.`;

export const GRAPHQL_ERRORS = {
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHENTICATED: 'UNAUTHENTICATED'
};

export const LEAD_ID_COOKIE = 'lead_id';

export const DATE_INPUT_FORMAT = 'DD/MM/YYYY';