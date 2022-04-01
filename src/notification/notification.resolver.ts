import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification, NotificationPagination, NotificationQueryResult } from './entities/notification.entity';
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

  @Query(() => NotificationQueryResult, { name: 'notifications' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('pagination', { nullable: true }) pagination: NotificationPagination = new NotificationPagination(),
    @CurrentUser() user: UserLogin
  ) {
    return this.notificationService.findAll(pagination, user);
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.findOne(id);
  }

  @Mutation(() => Notification)
  async updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput) {
    return await this.notificationService.update(updateNotificationInput.id, updateNotificationInput);
  }

  @Mutation(() => Notification)
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.remove(id);
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  isHasUnreadNotification(@CurrentUser() user: UserLogin) {
    return this.notificationService.isHasUnreadNotification(user);
  }
}
