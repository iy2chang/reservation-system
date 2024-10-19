import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  dateTime: string;

  @Prop({ Type: Number, required: true })
  guests: number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
