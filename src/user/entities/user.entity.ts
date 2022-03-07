import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { AbstractEntity } from 'src/common/abstract.entity';

@ObjectType()
export class User extends AbstractEntity {
  @Field(() => String)
  username: String;

  @Field(() => String)
  name: String;

  @Field(() => String)
  role: Role
}
