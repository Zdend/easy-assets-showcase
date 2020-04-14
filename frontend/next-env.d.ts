// / <reference types="next" />
// / <reference types="next/types/global" />
import DefaultClient from 'apollo-boost';
import { NextPageContext } from 'next';

declare module 'next' {
  interface NextPageContext {
    apolloClient: DefaultClient<any>;
  }
}
