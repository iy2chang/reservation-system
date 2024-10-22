import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationModule } from './reservation/reservation.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/reservation-system'),
    ReservationModule,
    RestaurantModule,
  ],
})
export class AppModule {}
