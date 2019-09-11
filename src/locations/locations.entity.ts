import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rooms } from 'src/rooms/rooms.entity';
import { Bookings } from 'src/bookings/bookings.entity';

@Entity()
export class Locations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departure: string;

  @Column()
  destination: string;

  @OneToMany(type => Rooms, room => room.id)
  rooms: Rooms[];

  @OneToMany(type => Bookings, booking => booking.id)
  bookings: Bookings[];
}
