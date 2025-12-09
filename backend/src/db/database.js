const {Pool} = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgres://user:password:blogia';
const pool = new Pool({
  connectionString,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      summary TEXT NOT NULL
    )
  `);
}

module.exports = {
  pool,
  initDB
}