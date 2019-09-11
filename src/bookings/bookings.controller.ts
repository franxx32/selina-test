import { Controller, Post, Body } from '@nestjs/common';
import { create } from 'domain';
import { CreateBookingDto } from './dto/createBooking.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }
}
