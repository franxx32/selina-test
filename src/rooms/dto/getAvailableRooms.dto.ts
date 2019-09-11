import { IsDateString } from 'class-validator';

export class GetAvailableRoomsDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
