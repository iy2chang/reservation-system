import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {}
