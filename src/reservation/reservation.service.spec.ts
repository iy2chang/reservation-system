import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';
import { Reservation } from './schemas/reservation.schema';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { exec } from 'child_process';

describe('ReservationService', () => {
  let service: ReservationService;
  let model: Model<Reservation>;

  const mockReservation = {
    name: 'John Doe',
    guests: 2,
    dateTime: '2024-10-18T07:30:00.000Z',
    _id: '67120f8ab793aa53f7dc08b6',
  };

  const mockReservationModel = {
    find: jest.fn().mockResolvedValue([mockReservation]),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockReservation),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockReservation),
    save: jest.fn().mockResolvedValue(mockReservation),
    create: jest.fn().mockResolvedValue(mockReservation),
    exec: jest.fn().mockResolvedValue(mockReservation),
  };

  // this is a hook that runs before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken(Reservation.name),
          useValue: mockReservationModel, // this is the mock database model
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    model = module.get<Model<Reservation>>(getModelToken(Reservation.name));
  });

  it('should create a reservation', async () => {
    const reservationDto = {
      name: 'Jan Doe',
      dateTime: '2024-10-01',
      guests: 2,
    };
    const result = await service.create(reservationDto);
    expect(result).toEqual(mockReservation);
    expect(mockReservationModel.create).toHaveBeenCalledWith(reservationDto);
    expect(mockReservationModel.create).toHaveBeenCalled();
  });

  it('should return all reservations', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockReservation]);
  });

  it('should return a reservation by id', async () => {
    const reservation: ReservationDto = {
      name: 'John Doe',
      guests: 2,
      dateTime: '2024-10-18T07:30:00.000Z',
    };

    await service.create(reservation);
    const result = await service.findOne(
      new Types.ObjectId('67120f8ab793aa53f7dc08b6'),
    );
    expect(result).toEqual(expect.objectContaining(reservation));
  });

  it('should throw an error when reservation not found', async () => {
    mockReservationModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    });
    await expect(
      service.findOne(new Types.ObjectId('67120f8ab793aa53f7dc08b7')),
    ).rejects.toThrow(NotFoundException);
  });

  // it('should update a reservation', () => {
  //   const reservation: ReservationDto = {
  //     id: 1,
  //     name: 'John Doe',
  //     guests: 2,
  //     dateTime: new Date(),
  //   };

  //   service.create(reservation);
  //   const updatedReservation: ReservationDto = {
  //     id: 1,
  //     name: 'Jane Doe',
  //     guests: 4,
  //     dateTime: new Date(),
  //   };

  //   const result = service.update(1, updatedReservation);
  //   expect(result).toEqual(expect.objectContaining(updatedReservation));
  // });

  // it('should delete a reservation', () => {
  //   const reservation: ReservationDto = {
  //     id: 1,
  //     name: 'John Doe',
  //     guests: 2,
  //     dateTime: new Date(),
  //   };

  //   service.create(reservation);
  //   service.delete(1);
  //   const result = service.findAll();
  //   expect(result).toEqual([]);
  // });
});
