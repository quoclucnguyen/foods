import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { AbstractEntity, AbstractFilter, Pagination, QueryResult } from 'src/common/abstract.entity';
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

@InputType()
export class NotificationFilter extends AbstractFilter {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  user?: string;
}

@InputType()
export class NotificationPagination extends Pagination {
  @Field(() => NotificationFilter, { nullable: true })
  where?: NotificationFilter;
}

@ObjectType()
export class NotificationQueryResult extends QueryResult {
  @Field(() => [Notification])
  items: Notification[];
}