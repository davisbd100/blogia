const hf = require("../db/hf");

async function promtToGenerateArticle(title){
    const prompt = `Write a short blog post about ${title}, make it short, arround 3 paragraphs, avoid bullet points, make it readable and friendly in max 350 tokens`;
    const response = await hf.hf.chatCompletion({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        messages: [
            {
                role: "user",
                content: prompt
            },
        ],
    });
    return response.choices[0].message.content;
}

module.exports = {
    promtToGenerateArticle
}