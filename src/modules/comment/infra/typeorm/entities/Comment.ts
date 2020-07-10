import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Post from '@modules/post/infra/typeorm/entities/Post';

@Entity()
class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ select: false })
  id_post: string;

  @ManyToOne(type => Post, post => post.comments)
  @JoinColumn({ name: 'id_post' })
  post: Post;
}

export default Comments;