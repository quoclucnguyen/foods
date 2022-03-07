import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { CreateFoodItemInput } from './dto/create-food-item.input';
import { UpdateFoodItemInput } from './dto/update-food-item.input';

@Injectable()
export class FoodItemService {
  constructor(
    private readonly prismaAppService: PrismaAppService,
  ) { }
  create(createFoodItemInput: CreateFoodItemInput) {
    return this.prismaAppService.prismaService.foodItem.create({
      data: createFoodItemInput
    })
  }

  async findAll() {
    const items = await this.prismaAppService.prismaService.foodItem.findMany({
      include: {
        location: true
      }
    })
    console.log(items);
    return items;

  }

  findOne(id: number) {
    return `This action returns a #${id} foodItem`;
  }

  update(id: number, updateFoodItemInput: UpdateFoodItemInput) {
    return `This action updates a #${id} foodItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodItem`;
  }
}
