import { Module } from '@nestjs/common';
import { FoodItemService } from './food-item.service';
import { FoodItemResolver } from './food-item.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [FoodItemResolver, FoodItemService],
    exports: [FoodItemService],
})
export class FoodItemModule {
}
