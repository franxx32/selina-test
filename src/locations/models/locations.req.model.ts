import { Request } from 'express';
import { Locations } from '../locations.entity';

export interface IRequestWithLocationState extends Request {
  location: Locations;
}
