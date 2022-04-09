const { Pool } = require('pg');
const { pg_database, pg_host, pg_password, pg_port, pg_user } = {
    pg_port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    pg_host: process.env.POSTGRES_HOST || '127.0.0.1',
    pg_database: process.env.POSTGRES_DATABASE || 'postgres',
    pg_user: process.env.POSTGRES_USER || 'postgres',
    pg_password: process.env.POSTGRES_PASSWORD || 'postgres',
};

const pool = new Pool({
    user: pg_user,
    database: pg_database,
    password: pg_password,
    host: pg_host,
    port: pg_port,
    max: 20
});

async function query(query, params) {
    const client = await pool.connect();
    try {
        return await client.query(query, params);
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = {
    query
}