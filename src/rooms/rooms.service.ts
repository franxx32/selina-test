import { Injectable } from '@nestjs/common';
import { Rooms, RoomTypes } from './rooms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Bookings } from 'src/bookings/bookings.entity';
import { GetAvailableRoomsDto } from './dto/getAvailableRooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) {}

  // TODO : 1) Amount,
  async getAvailableRoom(
    locationId: number,
    getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    const unavailableRooms = (await this.getUnavailableRooms(
      locationId,
      getAvailableRoomsDto,
    )).map(room => room.type);

    return Object.keys(RoomTypes).filter(
      room => !unavailableRooms.includes(room),
    );
  }

  private getUnavailableRooms(
    locationId: number,
    getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    return getConnection()
      .createQueryBuilder(Bookings, 'b')
      .leftJoin('b.room', 'r')
      .select('r.type as type')
      .where(
        `(b.startDate <= :endDate and b.endDate >= :startDate) and r."locationId" = :locationId`,
        {
          locationId,
          endDate: getAvailableRoomsDto.endDate,
          startDate: getAvailableRoomsDto.startDate,
        },
      )
      .groupBy('r.id')
      .addGroupBy('r.type')
      .having('count(b."roomId") > 0')
      .getRawMany();
  }
}
