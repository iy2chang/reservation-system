import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async create(reservation: ReservationDto): Promise<Reservation> {
    const createdReservation = await this.reservationModel.create(reservation);
    return createdReservation;
  }

  async findAll(): Promise<Reservation[]> {
    const reservations = await this.reservationModel.find();
    return reservations;
  }

  async findOne(id: Types.ObjectId): Promise<Reservation> {
    const reservation = await this.reservationModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    return reservation;
  }

  async update(
    id: Types.ObjectId,
    updateReservationDto: ReservationDto,
  ): Promise<Reservation> {
    const updatedReservation = await this.reservationModel.findByIdAndUpdate(
      id,
      updateReservationDto,
      { new: true },
    );

    if (!updatedReservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    return updatedReservation;
  }

  async delete(id: Types.ObjectId): Promise<Reservation> {
    const result = await this.reservationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return result;
  }
}
