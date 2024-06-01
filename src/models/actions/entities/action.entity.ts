import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'actions' })
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
