import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import Post from './Post';

@Entity()
class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_post: string;

  @Column()
  id_user: string;

  @ManyToOne(type => Post, post => post.referencedLikes, {
    eager: true,
  })
  @JoinColumn({ name: 'id_post' })
  post: Post;
}

export default Like;