import { RoleEnum } from "./role.enum";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./user";
import { State } from "./role.enum copy";


@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'enum',
        enum: State,
        default: State.ASIGNADO
    })
    state!: string;

    @Column("text")
    titulo!: string;

    @Column("text")
    descripcion!: string;


    @ManyToOne(() => User, (user) => user.tasks)
    user!: User;


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column("date")
    fechaVencimiento!: Date;
}
