require('dotenv').config()

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const articlesRoute = require('./routes/articles');

const app = express();
app.use(cors());
app.use(express.json());

const connectionString = process.env.DATABASE_URL || 'postgres://user:password:blogia';
const pool = new Pool({
  connectionString,
});

app.locals.pool = pool;

app.use('/articles', articlesRoute);


app.get('/', (_, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
