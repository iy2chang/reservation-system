import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';
import { ParseObjectIdPipe } from 'src/transformer/parseObjectId';
import { Types } from 'mongoose';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async create(@Body() restaurant: RestaurantDto) {
    return await this.restaurantService.create(restaurant);
  }

  @Get()
  async findAll() {
    return await this.restaurantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return await this.restaurantService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() restaurant: UpdateRestaurantDto,
  ) {
    return await this.restaurantService.update(id, restaurant);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.restaurantService.delete(new Types.ObjectId(id));
  }
}
