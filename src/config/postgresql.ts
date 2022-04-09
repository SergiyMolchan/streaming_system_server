export default () => ({
    pg_port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    pg_host: process.env.POSTGRES_HOST || '127.0.0.1',
    pg_database: process.env.POSTGRES_DATABASE || 'postgres',
    pg_user: process.env.POSTGRES_USER || 'postgres',
    pg_password: process.env.POSTGRES_PASSWORD || 'postgres',
});