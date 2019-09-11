import { Controller, Get, Query, Param } from '@nestjs/common';
import { GetAvailableRoomsDto } from './dto/getAvailableRooms.dto';
import { ValidationPipe } from './room.pipe';
import { RoomsService } from './rooms.service';

@Controller('locations/:locationId')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('rooms')
  getAvailableRooms(
    @Param(ValidationPipe) params,
    @Query() getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    const { locationId } = params;
    console.log(getAvailableRoomsDto);

    return this.roomsService.getAvailableRoom(locationId, getAvailableRoomsDto);
  }
}
