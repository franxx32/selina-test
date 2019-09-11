import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { LocationsModule } from 'src/locations/locations.module';
import { RoomsService } from './rooms.service';
import { Rooms } from './rooms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RoomsController],
  imports: [LocationsModule, TypeOrmModule.forFeature([Rooms])],
  providers: [RoomsService],
})
export class RoomsModule {}
