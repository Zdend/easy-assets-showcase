import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  resetPasswordToken: string | null;

  @Column({ nullable: true })
  password: string | null;

  @Column({ nullable: true })
  role: string | null;

  public name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
