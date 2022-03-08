import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FoodItemService } from '../food-item/food-item.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
      private readonly foodItemService: FoodItemService,
    ) {
    }


    // @Cron('* * * * * *')
    async foodCheckDate() {
        const date = new Date();
        this.logger.debug('Food check date cron job begin');
        const foodItems = await this.foodItemService.findAll();

        for (const foodItem of foodItems) {

            if (foodItem.dateEnd.getTime() < date.getTime()) {
                this.logger.debug(`Food item "${foodItem.name}" expired`);
            }
        }
        this.logger.debug('Food check date cron job executed in ' + ((new Date()).getTime() - date.getTime()) + ' ms');
    }
}
