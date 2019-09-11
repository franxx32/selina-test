import { IsDateString, IsPositive } from 'class-validator';

export class CreateBookingDto {
  @IsPositive()
  locationId: number;

  @IsPositive()
  roomId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
