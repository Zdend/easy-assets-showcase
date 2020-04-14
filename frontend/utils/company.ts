import { Company } from '@/generated/types';

export const getCompanyLinkOptions = (item?: Partial<Company>) => {
  const identifier = item?.slug || item?.id;
  return {
    href: `/company/[id]`,
    as: `/company/${identifier}`
  };
};
