import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { AuCity } from '../generated/types';
import { Company } from './Company';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ type: 'text', nullable: true })
  city?: AuCity;

  @Column({ nullable: true })
  companyName?: string;

  @Column({ nullable: true })
  requirements?: string;

  @ManyToMany(() => Company, { cascade: true })
  @JoinTable({
    name: 'lead_company'
  })
  companies: Company[];
}
