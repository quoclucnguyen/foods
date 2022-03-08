import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FoodItemService } from './food-item.service';
import { FoodItem } from './entities/food-item.entity';
import { CreateFoodItemInput } from './dto/create-food-item.input';
import { UpdateFoodItemInput } from './dto/update-food-item.input';
import { Roles } from 'src/auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser, UserLogin } from 'src/auth/current-user.decotator';

@Resolver(() => FoodItem)
export class FoodItemResolver {
    constructor(private readonly foodItemService: FoodItemService) {
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => FoodItem)
    createFoodItem(
      @Args('createFoodItemInput') createFoodItemInput: CreateFoodItemInput,
      @CurrentUser() user: UserLogin,
    ) {
        createFoodItemInput.createdBy = user.id;
        return this.foodItemService.create(createFoodItemInput);
    }

    @Query(() => [FoodItem], { name: 'foodItems' })
    findAll() {
        return this.foodItemService.findAll();
    }

    @Query(() => FoodItem, { name: 'foodItem' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.foodItemService.findOne(id);
    }

    @Mutation(() => FoodItem)
    updateFoodItem(@Args('updateFoodItemInput') updateFoodItemInput: UpdateFoodItemInput) {

        return this.foodItemService.update(updateFoodItemInput.id, updateFoodItemInput);
    }

    @Mutation(() => FoodItem)
    removeFoodItem(@Args('id', { type: () => Int }) id: number) {
        return this.foodItemService.remove(id);
    }
}
