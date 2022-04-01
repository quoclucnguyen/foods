import { Injectable, Logger } from '@nestjs/common';
import { UserLogin } from 'src/auth/current-user.decotator';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { NotificationPagination } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { UserService } from 'src/user/user.service';
import { NotificationStatus } from '@prisma/client';
@Injectable()
export class NotificationService {

  private logger = new Logger('NotificationService');
  constructor(
    readonly prismaAppService: PrismaAppService,
    readonly userService: UserService,

  ) { }
  async create(input: CreateNotificationInput) {
    /**
     * BEGIN send FCM
     */
    const user = await this.userService.findOne(input.userId);
    if (user && user?.deviceId) {
      const message: Message = {
        token: user.deviceId,
        notification: {
          title: input.title,
          body: input.message
        }
      }
      const result = await admin.messaging().send(message)
      this.logger.debug(result);
    } else {
      this.logger.error(`User "${input.userId}" not found OR not have deviceId`);
    }
    /**
     * END send FCM
     */
    return this.prismaAppService.prismaService.notification.create({
      data: input
    })
  }

  async findAll(pagination: NotificationPagination, user: UserLogin) {
    const filter = {
      isActive: true,
      userId: user.id
    }
    const total = this.prismaAppService.prismaService.notification.count({
      where: filter
    })

    const items = await this.prismaAppService.prismaService.notification.findMany({
      where: filter,
      include: {
        user: true
      },
      take: pagination.take,
      skip: pagination.skip,
    });
    return { total, items }

  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async update(id: string, updateNotificationInput: UpdateNotificationInput) {
    return await this.prismaAppService.prismaService.notification.update({
      where: {
        id: id
      },
      data: {
        status: updateNotificationInput.status
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
  async isHasUnreadNotification(user: UserLogin) {
    const count = await this.prismaAppService.prismaService.notification.count({
      where: {
        isActive: true,
        userId: user.id,
        status: NotificationStatus.NEW
      }
    })
    return count > 0;

  }
}
