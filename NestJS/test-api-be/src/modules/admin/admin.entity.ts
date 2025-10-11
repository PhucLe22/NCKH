import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  adminCode: string;
}