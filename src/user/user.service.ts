import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserRepository } from "./user.repository";
import { NewUserDto } from "./user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    private readonly saltRounds: number;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) {
        this.saltRounds = this.configService.get('saltRounds');
    }

    public async registration(newUser: NewUserDto) {
        try {
            const existUser = await this.userRepository.getUserByLogin(newUser);
            if (existUser) {
                throw 'A user with such a login already exists.'
            }
            newUser.password = await this.encryptPassword(newUser.password);
            await this.userRepository.create(newUser);
        } catch (error) {
            console.log(error)
            throw {
                message: 'Failed to register user.',
                error
            }
        }
    }

    private async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds as number);
        return await bcrypt.hash(password, salt);
    }

    private async checkPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
