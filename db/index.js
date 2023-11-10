const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: '332211',
    port: 5431,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
