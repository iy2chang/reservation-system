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
  create(@Body() restaurant: RestaurantDto) {
    return this.restaurantService.create(restaurant);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.restaurantService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() restaurant: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, restaurant);
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.restaurantService.delete(new Types.ObjectId(id));
  }
}
