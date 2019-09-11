import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { LocationsService } from 'src/locations/locations.service';

@Injectable()
export class LocationsMiddleware implements NestMiddleware {
  constructor(private readonly locationsService: LocationsService) {}
  async use(req: Request) {
    const { 0: locationId } = req.params;
    const location = await this.locationsService.findOne(+locationId);
    if (!location) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
    req.next();
  }
}
