import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FoodItemModule } from '../food-item/food-item.module';

@Module({
    imports: [FoodItemModule],
    providers: [TasksService],
})
export class TasksModule {
}
