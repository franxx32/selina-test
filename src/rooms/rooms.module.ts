import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  controllers: [RoomsController],
  imports: [LocationsModule],
})
export class RoomsModule {}
