import { Transform } from 'class-transformer';
import { IsString, IsInt, Min, Max, IsDate, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ReservationDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  @Max(4)
  guests: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateTime: Date;

  @IsMongoId()
  restaurant: Types.ObjectId;
}
