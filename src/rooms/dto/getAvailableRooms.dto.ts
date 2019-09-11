import { IsDateString } from 'class-validator';

export class GetAvailableRoomsDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
