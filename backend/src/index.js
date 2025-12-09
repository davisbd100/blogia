require('dotenv').config()

const express = require('express');
const cors = require('cors');
const articlesRoute = require('./routes/articles');
const {initDB} = require('./db/database');
const { cronJobDaily } = require('./services/cronArticle');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/articles', articlesRoute);

cronJobDaily();

const port = process.env.PORT || 3000;
app.listen(port, async() => {
  await initDB();
  console.log(`Server listening on port ${port}`);
});
