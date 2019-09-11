import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { Bookings } from './bookings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Rooms } from '../rooms/rooms.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
  ) {}

  create(createBookingDto: CreateBookingDto) {
    const { startDate, endDate, roomId } = createBookingDto;
    return this.bookingsRepository.manager.transaction(async tr => {
      const room = await tr.query(
        this.getFullRoomQuery(roomId, startDate, endDate),
      );
      if (room.length) {
        throw new HttpException(
          'This room is no longer available',
          HttpStatus.BAD_REQUEST,
        );
      }
      const booking = new Bookings();
      booking.room = roomId;
      booking.startDate = startDate;
      booking.endDate = endDate;

      const savedRoom = await tr.save(booking);
      return savedRoom;
    });
  }

  private getFullRoomQuery(roomId: number, startDate: Date, endDate: Date) {
    return this.bookingsRepository
      .createQueryBuilder('b')
      .leftJoinAndMapOne('b.room', Rooms, 'r', `r.id = ${roomId}`)
      .select('count(b.id)')
      .where(`(b.startDate <= '${endDate}' and b.endDate >= '${startDate}')`)
      .andWhere(`(b."roomId" = ${roomId})`)
      .groupBy('r.id')
      .having('count(b.id) > r.amount')
      .getQuery();
  }
}
