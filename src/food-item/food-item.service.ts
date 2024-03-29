import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserLogin } from 'src/auth/current-user.decotator';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { CreateFoodItemInput } from './dto/create-food-item.input';
import { UpdateFoodItemInput } from './dto/update-food-item.input';
import { FoodItemPagination } from './entities/food-item.entity';


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

    async findAll(pagination: FoodItemPagination, user?: UserLogin) {

        const filter: any = {
            isActive: true
        };
        if (pagination?.where?.name) {
            filter.name = {
                contains: pagination?.where?.name
            };
        }
        if (pagination?.where?.locationId) {
            filter.locationId = pagination?.where?.locationId;
        }
        if (user.role === Role.USER) {
            filter.createdBy = user.id;
        }

        const total = this.prismaAppService.prismaService.foodItem.count({
            where: filter
        })
        const items = this.prismaAppService.prismaService.foodItem.findMany({
            take: pagination.take,
            skip: pagination.skip,
            where: filter,
            include: {
                location: true
            },
            orderBy: [
                { createdAt: 'desc' },
                { status: 'desc' }
            ]


        })
        return { items, total };
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
        for (const key in updateFoodItemInput) {
            if ((typeof updateFoodItemInput[key] !== 'boolean') && !updateFoodItemInput[key]) {
                delete updateFoodItemInput[key];
            }
        }
        if (Object.keys(updateFoodItemInput).length === 0) {
            return this.prismaAppService.prismaService.foodItem.findFirst({
                where: {
                    id: id
                }
            })
        }
        return this.prismaAppService.prismaService.foodItem.update({
            where: {
                id: id,
            },
            data: updateFoodItemInput,
        });
    }

    remove(id: string) {
        return this.prismaAppService.prismaService.foodItem.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        })
    }
}
