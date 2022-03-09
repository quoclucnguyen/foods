import { ObjectType, Field, Int, extend, FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/abstract.entity';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/user/entities/user.entity';


const dateToLocalStringMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const source: FoodItem = ctx.source;
  const value: Date = source.dateEnd;
  return value ? value.toLocaleString() : null;
};

@ObjectType()
export class FoodItem extends AbstractEntity {
  @Field(() => String)
  name: string;

  @Field(() => Location)
  location: Location;

  @Field(() => Date)
  dateEnd?: Date

  @Field(() => User)
  createdByUser: User;

  @Field(() => String, { nullable: true, middleware: [dateToLocalStringMiddleware] })
  dateEndInLocalString: string;
}
