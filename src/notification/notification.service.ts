import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prismaAppService: PrismaAppService
  ) { }
  create(createNotificationInput: CreateNotificationInput) {
    return this.prismaAppService.prismaService.notification.create({
      data: createNotificationInput
    })
  }

  findAll() {
    return this.prismaAppService.prismaService.notification.findMany({
      where: {
        isActive: true
      },
      include: {
        user: true
      }
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
