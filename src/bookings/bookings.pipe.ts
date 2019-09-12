import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ValidationBookingCreatePipe implements PipeTransform<any> {
  transform(value: any, { metatype }: ArgumentMetadata) {
    let { startDate, endDate } = value;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (startDate >= endDate || startDate < new Date()) {
      throw new HttpException('Unavailable dates', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
