import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstract.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Notification extends AbstractEntity {
  @Field(() => String)
  title: string;

  @Field(() => String)
  message: string;

  @Field(() => User)
  user?: string;
}
