import { ObjectType, Field, Int, extend } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstract.entity';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class FoodItem extends AbstractEntity {
  @Field(() => String)
  name: string;

  @Field(() => Location)
  location: Location;

  @Field(() => Date, { nullable: true })
  dateEnd?: Date

  @Field(() => User)
  createdByUser: User;
}
