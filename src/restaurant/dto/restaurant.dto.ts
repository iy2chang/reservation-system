import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class RestaurantDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsInt()
  @Min(0)
  capacity: number;
}
