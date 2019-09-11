import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { Locations } from './locations.entity';
import { LocationsService } from './locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const MockRepository = jest.fn().mockImplementation();
const mockRepository = new MockRepository();

describe('Locations Controller', () => {
  let controller: LocationsController;
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(Locations),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
    controller = module.get<LocationsController>(LocationsController);
  });

  it('getLocations', async () => {
    const result = [
      {
        id: 1,
        departure: 'a',
        destination: 'b',
      },
    ];
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result));
    const response = await controller.getLocations();
    expect(response).toBe(result);
  });
});
