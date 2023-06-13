import { RoleEnum } from "./role.enum";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from "typeorm";
import { Task } from "./task";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    firstName!: string;

    @Column("text")
    lastName!: string;

    @Column("text",{ unique: true })
    email!: string;

    @Column("text")
    password!: string;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.EJECUTOR
    })
    role!: string;

    @Column({ default: true })
    isFirtsLogin!: boolean

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[]

}
