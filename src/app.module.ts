import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { LocationsModule } from './locations/locations.module';
import { Routes, RouterModule } from 'nest-router';

const routes: Routes = [
  {
    path: '/locations/:id',
    module: LocationsModule,
    children: [
      {
        path: '/rooms',
        module: RoomsModule,
      },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes), // setup the routes
    RoomsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
