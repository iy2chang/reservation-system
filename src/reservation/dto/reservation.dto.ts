import { Transform } from 'class-transformer';
import { IsString, IsInt, Min, Max, IsDate } from 'class-validator';
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
}
