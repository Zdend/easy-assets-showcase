import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { Feature } from './Feature';
import { Address } from './Address';
import { CompanyLanguage } from './CompanyLanguage';
import { CompanyTag } from './CompanyTag';
import { AudienceType, CompanyField, CompanyServiceType, CompanyStatus } from '../generated/types';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  status: CompanyStatus;

  @Column({ nullable: true, type: 'longtext' })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column()
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  type: AudienceType;

  @Column({ type: 'text', nullable: true })
  serviceType: CompanyServiceType;

  @Column()
  premium: boolean = false;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  manager: User;

  @Column({ nullable: true })
  affiliateUrl: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @ManyToMany(() => Feature, { cascade: true })
  @JoinTable({
    name: 'company_feature'
  })
  features: Feature[];

  @ManyToMany(() => Address, { cascade: true })
  @JoinTable({
    name: 'company_address'
  })
  addresses: Address[];

  @OneToMany(
    () => CompanyLanguage,
    companyLanguage => companyLanguage.company,
    { cascade: true }
  )
  languages: CompanyLanguage[];

  @Column({ nullable: true, type: 'longtext' })
  pricing: string;

  @OneToMany(
    () => CompanyTag,
    companyTag => companyTag.company,
    { cascade: true }
  )
  tags: CompanyTag[];
}

export const COMPANY_FIELD_MAP = {
  [CompanyField.NAME]: 'name',
  [CompanyField.CREATED_AT]: 'createdAt',
  [CompanyField.PREMIUM]: 'premium',
  [CompanyField.SERVICE_TYPE]: 'serviceType',
  [CompanyField.TYPE]: 'type',
  [CompanyField.ADDRESS_CITY]: 'city',
  [CompanyField.PRICING]: 'pricing',
};
