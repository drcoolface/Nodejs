import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import { Event } from "./Event";
import { Registration } from "./Registration";

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

    @OneToMany(() => Event, events => events.organizer,{
        cascade: true,
        onDelete: "CASCADE"
    })
    events!: Event[];

    @OneToMany(() => Registration, registration => registration.user,
    {
        cascade: true,
        onDelete: "CASCADE"
    })
    registrations!: Registration[];
}
