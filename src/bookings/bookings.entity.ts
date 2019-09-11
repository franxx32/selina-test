import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Locations } from 'src/locations/locations.entity';
import { Rooms } from 'src/rooms/rooms.entity';
export enum RoomTypes {
  Dorm,
  Private,
  Deluxe,
}

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Locations, location => location.bookings)
  location: number;

  @ManyToOne(type => Rooms, room => room.bookings)
  room: number;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;
}
