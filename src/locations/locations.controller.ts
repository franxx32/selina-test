import { Controller, Get } from '@nestjs/common';

@Controller()
export class LocationsController {
  @Get()
  public getLocations() {
    return 'Tututut';
  }

  @Get(':id')
  public getLocation() {
    return 'first loc';
  }
}
