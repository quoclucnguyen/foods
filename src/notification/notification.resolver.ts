import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser, UserLogin } from 'src/auth/current-user.decotator';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) { }

  @Roles([Role.ADMIN])
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Notification)
  createNotification(
    @Args('createNotificationInput') createNotificationInput: CreateNotificationInput,
    @CurrentUser() user: UserLogin
  ) {
    createNotificationInput.createdBy = user.id;
    return this.notificationService.create(createNotificationInput);
  }

  @Query(() => [Notification], { name: 'notifications' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.findOne(id);
  }

  @Mutation(() => Notification)
  updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput) {
    return this.notificationService.update(updateNotificationInput.id, updateNotificationInput);
  }

  @Mutation(() => Notification)
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.remove(id);
  }
}
