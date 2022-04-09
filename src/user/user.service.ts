import { Injectable } from '@nestjs/common';
import { UserRepository } from "./user.repository";
import { NewUserDto } from "./user.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
    }

    public async registration(newUser: NewUserDto) {
        try {
            await this.userRepository.create(newUser);
        } catch (error) {
            throw {
                message: 'Failed to register user.',
                error
            }
        }
    }
}
