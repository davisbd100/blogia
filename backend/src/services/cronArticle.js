const { promtToGenerateArticle } = require("../services/clientAI");
const cron = require('node-cron');
const { createArticle } = require("../models/articleModel");

async function generateArticleDaily() {
    const title = `Article ${new Date().toISOString().split('T')[0]}`;
    const content = await promtToGenerateArticle(title);
    const summary = content.split('\n')[0];
    try{
        await createArticle(title, content, summary);
    }catch(e){
        console.log(e);
    }
}

function cronJobDaily(){
    cron.schedule('* * * * *', async () => {
        console.log('Running article generation');
        generateArticleDaily();
    });
}
module.exports = {
    cronJobDaily
}
