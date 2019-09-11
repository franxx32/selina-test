import { Controller, Get, Query, Param } from '@nestjs/common';
import { GetAvailableRoomsDto } from './dto/getAvailableRooms.dto';
import { ValidationPipe } from './room.pipe';

@Controller('locations/:locationId')
export class RoomsController {
  @Get('rooms')
  public getAvailableRooms(
    @Param(ValidationPipe) params,
    @Query() getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    console.log(getAvailableRoomsDto);
    return 'AWeSOmewewew';
  }
}
