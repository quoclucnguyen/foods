import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FoodItemModule } from '../food-item/food-item.module';
import { NotificationModule } from 'src/notification/notification.module';
import { InitService } from './init.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [FoodItemModule, NotificationModule, PrismaModule],
    providers: [TasksService, InitService],
})
export class TasksModule {
}
