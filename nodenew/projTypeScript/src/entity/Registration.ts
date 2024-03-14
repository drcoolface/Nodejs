import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Index } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
@Index(["user", "event"], { unique: true })
export class Registration {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registrationDate!: Date;

    @ManyToOne(() => User, user => user.registrations,
    )
    user!: User;

    @ManyToOne(() => Event, event => event.registrations,
    )
    event!: Event;
}
