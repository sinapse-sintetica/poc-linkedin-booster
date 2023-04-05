// import { Request, Response } from 'express';
// import { getOpenAiRevision } from '../lib/OpenAIRequest';

// // #swagger.tags = ['Revisão']
// // #swagger.description = 'Endpoint para obter uma revisão de perfil'
//   // #swagger.parameters['profile'] = { description: 'Sobre do perfil do LinkedIn', type: 'string' }
// // #swagger.responses[200] = {
// //   description: 'Perfil revisado com sucesso',
// //   schema: {
// //     $revisedprofile: 'string'
// //   }
// // }
// export const getRevisedProfile = async (req: Request, res: Response) => {
//   const { profile } = req.params;
//   const response = await getOpenAiRevision(profile);
  
//   const textResponse: string | undefined = response.data.choices[0].message?.content;
//   res.status(200).send(textResponse);
// };
