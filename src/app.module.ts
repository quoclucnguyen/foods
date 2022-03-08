import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { LocationModule } from './location/location.module';
import { FoodItemModule } from './food-item/food-item.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { NotificationModule } from './notification/notification.module';


@Module({
    imports: [
        PrismaModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: false,
            debug: true,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        UserModule,
        AuthModule,
        LocationModule,
        FoodItemModule,
        ScheduleModule.forRoot(),
        TasksModule,
        NotificationModule,

    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
    ],
    exports: [],
})
export class AppModule {
}
