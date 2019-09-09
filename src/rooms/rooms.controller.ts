import { Controller, Get } from '@nestjs/common';

@Controller()
export class RoomsController {
  @Get()
  public getLocations() {
    return 'Tututut';
  }

  @Get(':id')
  public getRoom() {
    return 'Room';
  }
}
