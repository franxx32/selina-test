import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookings } from './bookings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/createBooking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
  ) {}

  create(createBookingDto: CreateBookingDto) {
    const { startDate, endDate, roomId } = createBookingDto;
    this.bookingsRepository.save({
      startDate,
      endDate,
      room: roomId,
    });
  }
}
