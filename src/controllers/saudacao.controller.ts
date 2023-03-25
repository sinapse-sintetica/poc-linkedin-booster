import { Request, Response } from 'express';

// #swagger.tags = ['Saudação']
// #swagger.description = 'Endpoint para obter uma saudação personalizada'
// #swagger.parameters['nome'] = { description: 'Nome da pessoa para a saudação', type: 'string' }
// #swagger.responses[200] = {
//   description: 'Saudação obtida com sucesso',
//   schema: {
//     $saudacao: 'string'
//   }
// }
export const getSaudacao = (req: Request, res: Response) => {
  const nome = req.query.nome || 'Visitante';
  res.json({ saudacao: `Olá, ${nome}! Bem-vindo à nossa API!` });
};
