import { Transform } from 'class-transformer';
import { IsString, IsInt, Min, Max, IsDate, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2, description: 'Number of Guests between 1 and 4' })
  @IsInt()
  @Min(1)
  @Max(4)
  guests: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateTime: Date;

  @ApiProperty({
    example: '60f1b0b3b3b3b3b3b3b3b3b3',
    description: 'Restaurant ID',
  })
  @IsMongoId()
  restaurant: Types.ObjectId;
}
