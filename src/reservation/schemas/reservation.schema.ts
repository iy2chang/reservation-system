import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class Reservation extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  dateTime: Date;

  @Prop({ Type: Number, required: true })
  guests: number;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurant: Types.ObjectId;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
