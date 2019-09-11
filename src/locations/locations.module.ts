import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './locations.entity';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locations])],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
