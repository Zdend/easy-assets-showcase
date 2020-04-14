import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Language } from '../generated/types';
import { Company } from './Company';

@Entity({ name: 'company_language' })
export class CompanyLanguage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Company,
    company => company.languages
  )
  company: Company;

  @Column({ type: 'text' })
  language: Language;
}
