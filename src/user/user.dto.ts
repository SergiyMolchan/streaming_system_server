import {
    IsNotEmpty,
} from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}

export class NewUserDto extends UserDto {
    @IsNotEmpty()
    confirmPassword: string
}