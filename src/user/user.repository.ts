import { DbService } from "../db";
import { NewUserDto, UserDto } from "./user.dto";
import { QueryArrayResult } from "pg";
import {Inject} from "@nestjs/common";

export class UserRepository {
    constructor(
       @Inject(DbService) private readonly dbService,
    ) {
    }

    async create({ login, password }: NewUserDto): Promise<QueryArrayResult> {
        return await this.dbService.query(
            'INSERT INTO users (login, password) VALUES ($1::varchar(128), $2::text)',
            [login, password]
        );
    }

    async getUserByLogin({ login }: NewUserDto): Promise<UserDto> {
        const { rows } = await this.dbService.query('SELECT * FROM users WHERE login=$1::varchar(128)', [login]);
        return rows[0];
    }

    async getUserById(id: number): Promise<UserDto> {
        return await this.dbService.query('SELECT * FROM users WHERE id=$1::varchar(128)', [id]);
    }
}