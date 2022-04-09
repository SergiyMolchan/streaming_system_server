import { DbService } from "../db";
import { NewUserDto } from "./user.dto";
import { QueryArrayResult } from "pg";
import {Inject} from "@nestjs/common";

export class UserRepository {
    constructor(
       @Inject(DbService) private readonly dbService,
    ) {
    }

    async create({ login, password }: NewUserDto): Promise<QueryArrayResult> {
        return await this.dbService.query(
            'INSERT INTO users.users (login, password) VALUES ($1::varchar(128), $2::text)',
            [login, password]
        );
    }
}