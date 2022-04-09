import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { PoolConfig, Pool, QueryArrayResult } from 'pg'

@Injectable()
export class DbService {
    private readonly options: PoolConfig;
    constructor(
        private readonly config: ConfigService,
    ) {
        this.options = {
            user: this.config.get('user'),
            database: this.config.get('database'),
            password: this.config.get('password'),
            host: this.config.get('host'),
            // @ts-ignore
            port: this.config.get('port'),
            max: 20
        }
    }

    // todo: add semaphore
    public async query(query: string, params?: any[]): Promise<QueryArrayResult> {
        const pool = new Pool(this.options);
        const client = await pool.connect();
        try {
            return await client.query(query, params);
        } catch (error) {
            throw new Error(error);
        }  finally {
            client.release();
        }
    }
}
