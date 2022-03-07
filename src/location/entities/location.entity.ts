import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstract.entity';

@ObjectType()
export class Location extends AbstractEntity {
  @Field(() => String)
  name: string
}
