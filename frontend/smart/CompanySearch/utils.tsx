import { FilterFormValues } from './types';
import { CompanyField, CompanyServiceType } from '@/generated/types';

export const convertValuesToFilter = (values: FilterFormValues) => {
  const filter = {
    [CompanyField.TYPE]: {
      in: values.type ? [values.type] : null
    },
    [CompanyField.SERVICE_TYPE]: {
      in: values.serviceType ? [values.serviceType] : null
    },
    [CompanyField.ADDRESS_CITY]: {
      in:
        values.serviceType === CompanyServiceType.FACE_TO_FACE && values.city ? [values.city] : null
    }
  };
  return filter;
};
