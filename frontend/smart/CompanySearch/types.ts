import { AudienceType, CompanyServiceType, AuCity, CompanyFilter } from '@/generated/types';

export interface FilterFormValues {
  type?: AudienceType;
  serviceType?: CompanyServiceType;
  city?: AuCity;
}
export interface FilterFormProps {
  onSearch: (filter: CompanyFilter) => void | Promise<void>;
  loading: boolean;
}
