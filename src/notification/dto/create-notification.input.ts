import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  message: string;

  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  createdBy?: string;

}
