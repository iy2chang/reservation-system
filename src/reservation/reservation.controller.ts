import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';
import { Types } from 'mongoose';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() reservation: ReservationDto) {
    return this.reservationService.create(reservation);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(new Types.ObjectId(id));
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.reservationService.delete(+id);
  }
}
