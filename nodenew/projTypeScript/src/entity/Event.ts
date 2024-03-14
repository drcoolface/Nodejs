import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Registration } from "./Registration";
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

    @Column({ type: 'date', default: () => "CURRENT_DATE" }) // Or a specific date '2023-01-01'
date!: Date;

    @ManyToOne(() => User, user => user.events,
    )
    organizer!: User;

    @OneToMany(() => Registration, registration => registration.event,
    {
        cascade: true,
        onDelete: "CASCADE"
    })
    registrations!: Registration[];

}
