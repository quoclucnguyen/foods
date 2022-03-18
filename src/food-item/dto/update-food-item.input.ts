import { CreateFoodItemInput } from './create-food-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
@InputType()
export class UpdateFoodItemInput extends PartialType(CreateFoodItemInput) {
    @Field(() => String, { nullable: true })
    id: string;

    @Field(() => Boolean, { nullable: true })
    isActive: boolean;

    @Field(() => String, { nullable: true })
    status: Status;

}
