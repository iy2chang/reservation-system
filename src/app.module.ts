import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/reservation-system'),
    ReservationModule,
  ],
})
export class AppModule {}
