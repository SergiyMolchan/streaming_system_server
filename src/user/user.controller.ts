import { Body, Controller, Post } from '@nestjs/common';
import { NewUserDto } from "./user.dto";
import { Response } from "../common/interfaces/response";

@Controller()
export class UserController {
    constructor() {
    }

    @Post('registration')
    registration(@Body() newUser: NewUserDto): Response {
        console.log('newUserDto', newUser)
        return {
            message: 'Registered',
            data: newUser
        }
    }

    @Post('authentication')
    authentication() {

    }
}
