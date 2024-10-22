import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant } from './schema/restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async create(restaurant: RestaurantDto): Promise<Restaurant> {
    const createdRestaurant = await this.restaurantModel.create(restaurant);
    return createdRestaurant;
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }

  async findOne(id: Types.ObjectId): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return restaurant;
  }

  async update(
    id: Types.ObjectId,
    updateRestaurantDto: RestaurantDto,
  ): Promise<Restaurant> {
    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(
      id,
      updateRestaurantDto,
      { new: true },
    );

    if (!updatedRestaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return updatedRestaurant;
  }

  async delete(id: Types.ObjectId): Promise<Restaurant> {
    const result = await this.restaurantModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return result;
  }
}
