import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Locations } from '../locations/locations.entity';
import { Bookings } from '../bookings/bookings.entity';
export enum RoomTypes {
  Dorm = 'Dorm',
  Private = 'Private',
  Deluxe = 'Deluxe',
}

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: RoomTypes;

  @Column({ default: 10 })
  amount: number;

  @Column()
  price: number;

  @ManyToOne(type => Locations, location => location.rooms)
  location?: number;

  @OneToMany(type => Bookings, booking => booking.id)
  bookings?: Bookings[];
}
