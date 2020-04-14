import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from './User';
import { Feature } from './Feature';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @ManyToOne(() => User, {
    cascade: true
  })
  @JoinColumn()
  author: User;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  publishedAt: Date;

  @Column()
  published: boolean;

  @Column({ nullable: true })
  mainImage: string | null;

  @Column({ nullable: true, unique: true })
  slug: string | null;

  @ManyToMany(() => Feature, { cascade: true })
  @JoinTable({
    name: 'post_feature'
  })
  features: Feature[];
}

export const POST_FIELD_MAP = {
  PUBLISHED: 'published',
  TITLE: 'title',
  CREATED_AT: 'createdAt',
  PUBLISHED_AT: 'publishedAt',
};
