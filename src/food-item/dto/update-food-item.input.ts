import { CreateFoodItemInput } from './create-food-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFoodItemInput extends PartialType(CreateFoodItemInput) {
  @Field(() => Int)
  id: number;
}
