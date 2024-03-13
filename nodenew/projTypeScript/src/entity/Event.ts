import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    thumbnail!: string;

    @Column()
    seats!: number;

    @Column('decimal')
    price!: number;

    @ManyToOne(() => User, user => user.events)
    organizer!: User;
}
