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

  async getAvailableRoom(
    locationId: number,
    getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    const unavailableRooms = await this.getUnavailableRooms(
      locationId,
      getAvailableRoomsDto,
    );

    return Object.keys(RoomTypes).filter(
      room => !unavailableRooms.includes(room),
    );
  }

  private async getUnavailableRooms(
    locationId: number,
    getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    const query = this.getUnavailableRoomsQuery(
      locationId,
      getAvailableRoomsDto,
    );
    return (await getConnection().query(query)).map(room => room.type);
  }

  private getUnavailableRoomsQuery(
    locationId: number,
    getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    const { startDate, endDate } = getAvailableRoomsDto;
    return getConnection()
      .createQueryBuilder(Bookings, 'b')
      .leftJoin('b.room', 'r')
      .select('r.type as type')
      .where(`(b.startDate <= '${endDate}' and b.endDate >= '${startDate}')`)
      .andWhere(`r."locationId" = ${locationId}`)
      .groupBy('r.id')
      .addGroupBy('r.type')
      .having('count(b."roomId") > r.amount')
      .getQuery();
  }
}
