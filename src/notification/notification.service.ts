import { Injectable, Logger } from '@nestjs/common';
import { UserLogin } from 'src/auth/current-user.decotator';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { NotificationPagination } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { UserService } from 'src/user/user.service';
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

  findAll(pagination: NotificationPagination, user: UserLogin) {

    return this.prismaAppService.prismaService.notification.findMany({
      where: {
        isActive: true,
        userId: user.id
      },
      include: {
        user: true
      },
      take: pagination.take,
      skip: pagination.skip,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationInput: UpdateNotificationInput) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
