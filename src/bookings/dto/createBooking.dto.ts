import { IsDateString, IsPositive } from 'class-validator';

export class CreateBookingDto {
  @IsPositive()
  roomId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
