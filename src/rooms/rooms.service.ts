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
    const availableRooms = await this.getAvailableRooms(
      locationId,
      getAvailableRoomsDto,
    );

    return availableRooms;
  }

  private async getAvailableRooms(
    locationId: number,
    getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    const query = this.getUnavailableRoomsQuery(
      locationId,
      getAvailableRoomsDto,
    );
    const unavailableRoomIds = await getConnection().query(query);
    const locationRooms = await this.roomsRepository.find({
      location: locationId,
    });

    return locationRooms.filter(
      room => !unavailableRoomIds.some(r => r.id === room.id),
    );
  }

  private getUnavailableRoomsQuery(
    locationId: number,
    getAvailableRoomsDto: GetAvailableRoomsDto,
  ) {
    const { startDate, endDate } = getAvailableRoomsDto;
    return getConnection()
      .createQueryBuilder(Bookings, 'b')
      .leftJoin('b.room', 'r')
      .select('r.id as id')
      .where(`(b.startDate <= '${endDate}' and b.endDate >= '${startDate}')`)
      .andWhere(`r."locationId" = ${locationId}`)
      .groupBy('r.id')
      .addGroupBy('r.type')
      .having('count(b."roomId") > r.amount')
      .getQuery();
  }
}
