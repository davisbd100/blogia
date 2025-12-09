const {
    getAllArticles,
    getArticleById,
    createArticle,
} = require("../models/articleModel");
const { promtToGenerateArticle } = require("../services/clientAI");

async function allArticles(req, res){
    const articles = await getAllArticles();
    res.json(articles);
}

async function articleById(req, res){
    const { id } = req.params;
    const article = await getArticleById(id);
    if(!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
}

async function generateArticle(req, res){
    const { title, content, summary } = req.body;
    const articleId = await createArticle(title, content, summary);
    res.json({ id: articleId });
}

async function generateAIArticle(req, res){
    const title = req.body && req.body.title || `Article ${new Date().toISOString().split('T')[0]}`;
    // const content = await promtToGenerateArticle(title);
    const content = "On December 9, 2025, a significant update was made to the regulations governing digital privacy and data protection. This new Article 2025-12-09 introduces stricter guidelines for how companies must handle personal data, ensuring greater transparency and accountability. The changes emphasize the importance of obtaining explicit consent from users before collecting their data and require companies to provide clear, concise information about how data will be used. This update aims to protect individuals' privacy while \n fostering a more trustworthy digital environment"
    const summary = content.split('\n')[0];
    const articleId = await createArticle(title, content, summary);
    res.json({ id: articleId });
}

module.exports = {
    allArticles,
    articleById,
    generateArticle,
    generateAIArticle
}