import { Injectable } from '@nestjs/common';
import { Locations } from './locations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Locations)
    private readonly locationsRepository: Repository<Locations>,
  ) {}

  findOne(id: number): Promise<Locations> {
    return this.locationsRepository.findOne({ id });
  }
  findAll(): Promise<Locations[]> {
    return this.locationsRepository.find();
  }
}
