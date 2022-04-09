module.exports = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        login VARCHAR(128) UNIQUE,
        password TEXT
    );

    CREATE INDEX IF NOT EXISTS users_login_idx ON users (login);
`;