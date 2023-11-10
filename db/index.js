const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const testDBConnection = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed', error);
    }
};

module.exports = {
    query: (text, params) => pool.query(text, params),
    testDBConnection,
};
