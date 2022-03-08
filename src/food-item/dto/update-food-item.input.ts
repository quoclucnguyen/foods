import { CreateFoodItemInput } from './create-food-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFoodItemInput extends PartialType(CreateFoodItemInput) {
    @Field(() => String, { nullable: true })
    id: string;

    @Field(() => Boolean, { nullable: true })
    isActive: boolean;
}
