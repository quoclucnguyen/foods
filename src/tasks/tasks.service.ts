import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { NotificationService } from 'src/notification/notification.service';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { FoodItemService } from '../food-item/food-item.service';
import * as admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { FoodItemStatus } from '@prisma/client';
@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly foodItemService: FoodItemService,
        private readonly notificationService: NotificationService,
        private readonly prismaAppService: PrismaAppService
    ) {
    }


    @Cron('0 * * * * *')
    async foodCheckDate() {
        const date = new Date();
        this.logger.debug('Food check date cron job begin');
        const foodItems = await this.prismaAppService.prismaService.foodItem.findMany({
            where: {
                isSendNotification: false,
                isActive: true,
                status: {
                    not: FoodItemStatus.EATEN
                }
            },
            take: 10,// TODO: Change by config service or env !!


        })

        for (const foodItem of foodItems) {

            if (foodItem.dateEnd.getTime() < date.getTime()) {
                this.logger.debug(`Food item "${foodItem.name}" expired`);
                const notification = await this.notificationService.prismaAppService.prismaService.notification.findFirst({
                    where: {
                        foodItemId: foodItem.id
                    }
                });
                if (!notification) {
                    await this.notificationService.create({
                        title: `Food item "${foodItem.name}" expired`,
                        message: `Food item "${foodItem.name}" has date in "${foodItem.dateEnd}". Today is "${date}" please take it.`,
                        userId: foodItem.createdBy,
                        foodItemId: foodItem.id
                    })
                }
                await this.prismaAppService.prismaService.foodItem.update({
                    data: {
                        isSendNotification: true
                    },
                    where: {
                        id: foodItem.id
                    }

                })

            }

        }
        this.logger.debug('Food check date cron job executed in ' + ((new Date()).getTime() - date.getTime()) + ' ms');
    }

    // @Cron('0 * * * * *')
    async sendNotification() {

        const message: Message = {
            token: 'eu40ro1Eq6Z59xzA9nH56l:APA91bG3m7Fq1k-rcY95vOLP4LYf9sICU7ZlgNmtoGKsKFJodTE0SA4MbwcZ0BxtCmr98px3g-xVOidD_7uyDUyQh6JuXfBtqY6-NgNsndo7ZWdLR7-oF4cV3m3Ig7gZLUL79rNfbHUJ',
            notification: {
                title: '',
                body: ''
            }
        }
        admin.messaging().send(message)
    }
}
