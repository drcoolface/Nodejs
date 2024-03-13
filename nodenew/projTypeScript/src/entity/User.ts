import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Event } from "./Event";


export enum Role {
    User = "USER",
    Admin = "ADMIN",
}


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.User
    })
    role!: Role;

    @OneToMany(() => Event, events => events.organizer)
    events!: Event[];
}
