import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AuState, AuCity, AddressField } from '../generated/types';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  suburb: string;

  @Column()
  postcode: string;

  @Column({ type: 'text' })
  state: AuState;

  @Column({ type: 'text' })
  city: AuCity;

  @Column({ type: 'float', nullable: true })
  lat: number | null;

  @Column({ type: 'float', nullable: true })
  long: number | null;
}

export const ADDRESS_FIELD_MAP = {
  [AddressField.POSTCODE]: 'postcode',
  [AddressField.SUBURB]: 'suburb',
  [AddressField.STATE]: 'state',
  [AddressField.CITY]: 'city'
};
