import { Controller, Post, Body } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking.dto';
import { BookingsService } from './bookings.service';
import { ValidationBookingCreatePipe } from './bookings.pipe';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(
    @Body(ValidationBookingCreatePipe) createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(createBookingDto);
  }
}
