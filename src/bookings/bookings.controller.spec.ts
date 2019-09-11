import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bookings } from './bookings.entity';

const MockRepository = jest.fn().mockImplementation();
const mockRepository = new MockRepository();

describe('Bookings Controller', () => {
  let controller: BookingsController;
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Bookings),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    controller = module.get<BookingsController>(BookingsController);
  });

  it('create', async () => {
    const result = {
      id: 12,
      room: 4,
      startDate: new Date('2017-06-06T14:34:08.700Z'),
      endDate: new Date('2017-06-10T14:34:08.700Z'),
    };

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(result));
    const response = await controller.create({
      roomId: 4,
      startDate: new Date('2017-06-06T14:34:08.700Z'),
      endDate: new Date('2017-06-10T14:34:08.700Z'),
    });

    expect(response).toBe(result);
  });
});
