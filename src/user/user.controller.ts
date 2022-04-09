import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import { NewUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { Response } from "../common/interfaces/response";

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Post('registration')
    async registration(@Body() newUser: NewUserDto): Promise<Response> {
        try {
            const data = await this.userService.registration(newUser);
            return {
                message: 'Registered',
                data
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('authentication')
    authentication() {

    }
}
