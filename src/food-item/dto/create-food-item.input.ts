import { InputType, Int, Field } from '@nestjs/graphql';
import { AbstractInput } from 'src/common/abstract.input';

@InputType()
export class CreateFoodItemInput extends AbstractInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  locationId: string

  @Field(() => Date, { nullable: true })
  dateEnd?: Date

}
