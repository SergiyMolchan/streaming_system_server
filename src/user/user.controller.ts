import { Body, Controller, HttpException, HttpStatus, Post, Logger } from '@nestjs/common';
import { NewUserDto, UserDto } from "./user.dto";
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
            if (newUser.password !== newUser.confirmPassword) {
                throw new HttpException(`confirm password`, HttpStatus.BAD_REQUEST);
            }

            const data = await this.userService.registration(newUser);
            return {
                message: 'Registered',
                data
            }
        } catch (error) {
            Logger.error(error, UserController.name);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('authentication')
    authentication(@Body() user: UserDto) {

    }
}
