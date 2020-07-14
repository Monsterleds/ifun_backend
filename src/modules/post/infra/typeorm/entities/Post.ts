import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';
import Comment from '@modules/comment/infra/typeorm/entities/Comment';
import Likes from './Likes';

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

  @Column({ select: false })
  id_user: string;

  @ManyToOne(type => User, user => user.post)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(type => Comment, comment => comment.post, {
    eager: true,
  })
  comments: Comment[];

  @OneToMany(type => Likes, like => like.post)
  referencedLikes: Likes[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;