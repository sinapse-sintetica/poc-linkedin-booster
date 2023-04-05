import { OpenAIApi, Configuration } from 'openai';
import { ExtractedProfile } from './LinkedInScraper';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
});
console.log('key', process.env.OPENAI_SECRET_KEY);
const openai = new OpenAIApi(configuration);

const systemInstructionGtp3_5: string = `Você ATUARÁ como avaliador de perfis do LinkedIn. Seu trabalho será analisar o perfil profissional de uma pessoa, e reescrevê-lo de modo que seja atrativo para headhunters, mas mantendo a essência do texto, os dados e fatos importantes contidos no mesmo.`

export const getOpenAiRevision = async (profile: ExtractedProfile) => {
    const userInstruction: string = `Agora vamos reescrever em primeira pessoa o perfil de "${profile.name}". O headline do seu perfil é o seguinte: "${profile.headline}", e poderá ser usado para complementar a seção "about". Faça isso em inglês e português brasileiro. Segue o texto a ser reescrito:\n${profile.about}`;

    return await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemInstructionGtp3_5 },
            { role: 'user', content: userInstruction }
        ],
        temperature: 0.6,
        max_tokens: 500 // para evitar respostas longas demais
    })
};