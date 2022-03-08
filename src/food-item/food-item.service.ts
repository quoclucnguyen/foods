import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { CreateFoodItemInput } from './dto/create-food-item.input';
import { UpdateFoodItemInput } from './dto/update-food-item.input';

@Injectable()
export class FoodItemService {
    constructor(
      private readonly prismaAppService: PrismaAppService,
    ) {
    }

    create(createFoodItemInput: CreateFoodItemInput) {
        return this.prismaAppService.prismaService.foodItem.create({
            data: createFoodItemInput,
        });
    }

    async findAll() {
        return this.prismaAppService.prismaService.foodItem.findMany({
            include: {
                location: true,
            },
            where: {
                isActive: true,
            },
        });

    }

    findOne(id: string) {
        return this.prismaAppService.prismaService.foodItem.findFirst({
            where: {
                id,
            },
            include: {
                location: true,
            },
        });
    }

    update(id: string, updateFoodItemInput: UpdateFoodItemInput) {
        delete updateFoodItemInput?.id;
        return this.prismaAppService.prismaService.foodItem.update({
            where: {
                id: id,
            },
            data: updateFoodItemInput,
        });
    }

    remove(id: number) {
        return `This action removes a #${id} foodItem`;
    }
}
