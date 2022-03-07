import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => String)
  id: String;

  @Field(() => String)
  username: String;

  @Field(() => String)
  name: String;

  @Field(() => String)
  role: Role
}
