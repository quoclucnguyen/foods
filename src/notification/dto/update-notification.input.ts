import { CreateNotificationInput } from './create-notification.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { NotificationStatus } from '@prisma/client';

@InputType()
export class UpdateNotificationInput extends PartialType(CreateNotificationInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  status: NotificationStatus;
}
