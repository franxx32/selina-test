import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Locations } from 'src/locations/locations.entity';
import { Bookings } from 'src/bookings/bookings.entity';
export enum RoomTypes {
  Dorm,
  Private,
  Deluxe,
}

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: RoomTypes;

  @Column({ default: 10 })
  amount: number;

  @ManyToOne(type => Locations, location => location.rooms)
  location: Locations;

  @OneToMany(type => Bookings, booking => booking.id)
  bookings: Bookings[];
}
