import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"


@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   username: string

   @Column()
   firstName: string

   @Column()
   lastName: string

   @Column()
   email: string

   @Column()
   password: string

   @CreateDateColumn()
   createdDate: Date


}