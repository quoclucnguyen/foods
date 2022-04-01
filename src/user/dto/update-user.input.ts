import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, []) {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  accessToken?: string

  @Field(() => String, { nullable: true })
  deviceId?: string;
}
