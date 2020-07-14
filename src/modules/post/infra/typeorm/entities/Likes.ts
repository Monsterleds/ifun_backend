import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_post: string;

  @Column()
  id_user: string;
}

export default Like;