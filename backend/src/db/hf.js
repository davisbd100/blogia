const {InferenceClient} = require('@huggingface/inference');

const hf = new InferenceClient(process.env.HF_API_KEY);

module.exports = { hf }