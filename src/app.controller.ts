import { Controller, Get, HttpCode, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { phoneToPhones } from './helper';
import { PrismaService } from './prisma/prisma.service';
import * as admin from 'firebase-admin';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  // @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  async getUsers() {
    const message: Message = {
      token: 'eu40ro1Eq6Z59xzA9nH56l:APA91bFgGkFFQL1GaBqPRTIBKXVNWz7VG_jkPERCy1ldQwx5KYunlYGimUUtClDgCs0eRZkP2p3dzbOHBkgHF66-toMu2-rj2vbxOJG9lSgjltbr1wcSZFFDwT2x1iP_7P3mMXKysquW',
      notification: {
        title: 'title_dl',
        body: 'Hhhaosd'
      }
    }
    const string = await admin.messaging().send(message)
    console.log(string)
    return await this.appService.prismaService.user.findMany();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    const result = await this.authService.login(req.user, req.body);
    return result;
  }

  @Post('auth/logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  async logout(@Request() req) {
    const user = await this.authService.logout(req.user);
    return {
      logout: user !== undefined
    };
  }
}
