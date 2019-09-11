import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { LocationsModule } from './locations/locations.module';
import { Routes, RouterModule } from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RoomsModule,
    LocationsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
