import { RoleEnum } from "./role.enum";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./user";
import { StateEnum } from "./state.enum";


@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'enum',
        enum: StateEnum,
        default: StateEnum.ASIGNADO
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
