const {pool} = require("../db/database");

async function getAllArticles(){
    const {rows} = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
    return rows;
}
async function getArticleById(id){
    const {rows} = await pool.query("SELECT * FROM articles WHERE id = $1", [id]);
    return rows[0];
}


async function createArticle(title, content, summary){
    const result = await pool.query("INSERT INTO articles (title, content, summary) VALUES ($1, $2, $3) RETURNING id", [title, content, summary]);
    console.log(result);
    return result.rows[0].id;
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle
}