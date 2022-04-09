import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import {PoolConfig, Pool, QueryArrayResult, PoolClient} from 'pg'

@Injectable()
export class DbService {
    private readonly options: PoolConfig;
    constructor(
        private readonly config: ConfigService,
    ) {
        this.options = {
            user: this.config.get('pg_user'),
            database: this.config.get('pg_database'),
            password: this.config.get('pg_password'),
            host: this.config.get('pg_host'),
            port: this.config.get('pg_port'),
            max: 20
        }
    }

    // todo: add semaphore
    public async query(query: string, params?: any[]): Promise<QueryArrayResult> {
        const pool = new Pool(this.options);
        let client: PoolClient = await pool.connect();
        try {
            return await client.query(query, params);
        } catch (error) {
            throw `Database ${error}`;
        } finally {
            client.release();
        }
    }
}
