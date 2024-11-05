import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from 'src/transformer/parseObjectId';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() reservation: ReservationDto) {
    return await this.reservationService.create(reservation);
  }

  @Get()
  async findAll() {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return await this.reservationService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.reservationService.delete(new Types.ObjectId(id));
  }
}
