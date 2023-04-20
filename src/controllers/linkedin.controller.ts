import { Request, Response } from 'express';
import { LinkedInAPI } from '../lib/LinkedInAPI';
import { getOpenAiRevision } from '../lib/OpenAIRequest';

class LinkedInController {
  // #swagger.tags = ['LinkedIn']
  // #swagger.description = 'Endpoint para obter informações do perfil do LinkedIn'
  // #swagger.parameters['perfil'] = { description: 'Username do perfil do LinkedIn', type: 'string' }
  // #swagger.responses[200] = {
  //   description: 'Informações do perfil obtidas com sucesso',
  //   schema: {
  //     $name: 'string',
  //     $headline: 'string',
  //     $location: 'string',
  //     $about: 'string'
  //   }
  // }
  async getProfileInfo(req: Request, res: Response): Promise<void> {
    try {
      const { perfil } = req.params;
      const profileUrl = `https://www.linkedin.com/in/${perfil}`;
      const scraper = new LinkedInAPI(profileUrl);
      await scraper.init();
      const profileInfo = await scraper.getProfileInfo();

      // type ObjectKey = keyof typeof profileInfo;
      // const about = ('about') as ObjectKey

      // const response = await getOpenAiRevision(about);
      const response = await getOpenAiRevision(profileInfo);
      const revised = response.data.choices[0].message?.content;

      const updatedProfileInfo = {
        ...profileInfo,
        revised,
      };

      res.json(updatedProfileInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao fazer scraping do LinkedIn' });
    }
  }

}

export default new LinkedInController();
