import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from 'src/notification/notification.service';
import { FoodItemService } from '../food-item/food-item.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly foodItemService: FoodItemService,
        private readonly notificationService: NotificationService
    ) {
    }


    @Cron('0 * * * * *')
    async foodCheckDate() {
        const date = new Date();
        this.logger.debug('Food check date cron job begin');
        const foodItems = await this.foodItemService.findAll();

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

            }
        }
        this.logger.debug('Food check date cron job executed in ' + ((new Date()).getTime() - date.getTime()) + ' ms');
    }
}
