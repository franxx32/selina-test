import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private readonly locationsService: LocationsService) {}
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const { locationId } = value;
    const location = await this.locationsService.findOne(locationId);
    if (!location) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
    return value;
  }
}
