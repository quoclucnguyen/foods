import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ignoreElements } from 'rxjs';
import { reduceEachTrailingCommentRange } from 'typescript';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(username: string, password: string, type: string, deviceId: string) {
        const user = await this.userService.findByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            await this.userService.update(user.id, { deviceId: deviceId });
            return user;
        }
        return null;
    }

    async login(user: any, body: LoginBody) {
        const payload = {
            username: user.username,
            id: user.id,
            token: randomUUID(),
            role: user.role,
        };
        const update = await this.userService.update(user.id, {
            accessToken: payload.token,
        });
        return {
            id: update.id,
            accessToken: this.jwtService.sign(payload),
            username: update.username,
            role: update.role,
        };

    }

    async logout(user: any) {
        const update = this.userService.update(user.id, {
            id: user.id,
            accessToken: null,
        });
        return { logout: true };
    }
}

export interface LoginBody {
    username: string;
    password: string;
    type: LoginType;
    deviceId?: string;
}

export enum LoginType {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN'
}