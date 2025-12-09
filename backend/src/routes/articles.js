const express = require('express');
const router = express.Router();
const {
  allArticles,
  articleById,
  generateArticle,
  generateAIArticle
} = require("../controller/articleController");

router.get('/', allArticles);

router.get('/:id', articleById);

router.post('/generateArticle', generateArticle);

router.post('/generateAIArticle', generateAIArticle);

module.exports = router;
