import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Role } from "@prisma/client";
import { PrismaAppService } from "src/prisma/prisma.app.service";

@Injectable()
export class InitService {
    private readonly logger = new Logger(InitService.name);
    constructor(
        private readonly prismaAppService: PrismaAppService
    ) { }
    @Cron('30 * * * * *')
    async initData() {
        this.logger.debug('Init data cron job begin');
        const date = new Date()
        const users = await this.prismaAppService.prismaService.user.findMany({
            where: {
                role: Role.USER
            }
        });
        const locations = await this.prismaAppService.prismaService.location.findMany({
            where: {

            }
        })
        const user = users[(Math.random() * users.length) | 0];
        const location = locations[(Math.random() * locations.length) | 0];
        const foodItem = await this.prismaAppService.prismaService.foodItem.create({
            data: {
                createdBy: user.id,
                name: "Food item " + (Math.random() * 100 | 0),
                dateEnd: new Date(new Date().getTime() + (Math.random() * (1000 * 60 * 60 * 24 * 30))),
                locationId: location.id
            }
        });
        this.logger.debug('Init data cron job executed in ' + ((new Date()).getTime() - date.getTime()) + ' ms');

    }
}