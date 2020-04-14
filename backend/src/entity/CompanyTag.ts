import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CompanyTag as CompanyTagEnum } from '../generated/types';
import { Company } from './Company';

@Entity({ name: 'company_tag' })
export class CompanyTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Company,
    company => company.tags
  )
  company: Company;

  @Column({ type: 'text' })
  tag: CompanyTagEnum;
}