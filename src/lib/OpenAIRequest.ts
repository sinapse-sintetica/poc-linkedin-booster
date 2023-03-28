import { OpenAIApi, Configuration } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
});
console.log('key', process.env.OPENAI_SECRET_KEY);
const openai = new OpenAIApi(configuration);

const systemInstructionGtp3_5: string = `Você ATUARÁ como avaliador de perfis do LinkedIn. Seu trabalho será analisar o perfil profissional de uma pessoa, e reescrevê-lo, mas mantendo a essência do texto, a estrutura de entrada e os dados e fatos importantes contidos no texto.`

export const getOpenAiRevision = async (profile: string) => {
    return await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
        { role: 'system', content: systemInstructionGtp3_5 },
        { role: 'user', content: profile }
    ],
    temperature: 0.6,
    max_tokens: 500 // para evitar respostas longas demais
})};