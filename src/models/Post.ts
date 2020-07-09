import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import User from './User';
import Comment from './Comment';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column()
  avatar_id: string;

  @Column()
  id_user: string;

  @ManyToOne(type => User, user => user.post)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(type => Comment, comment => comment.post, {
    eager: true,
  })
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;