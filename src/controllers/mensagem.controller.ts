import { Request, Response } from 'express';

// #swagger.tags = ['Mensagem']
// #swagger.description = 'Endpoint para obter uma mensagem'
// #swagger.responses[200] = {
//   description: 'Mensagem obtida com sucesso',
//   schema: {
//     $mensagem: 'string'
//   }
// }

export const getMensagem = (req: Request, res: Response) => {
  res.json({ mensagem: 'Olá! Esta é uma API com Node.js, TypeScript e Swagger.' });
};
