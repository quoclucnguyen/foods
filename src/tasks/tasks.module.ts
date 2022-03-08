import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FoodItemModule } from '../food-item/food-item.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [FoodItemModule,NotificationModule],
    providers: [TasksService],
})
export class TasksModule {
}
