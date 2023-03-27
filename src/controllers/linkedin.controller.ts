import { Request, Response } from 'express';
import { LinkedInScraper } from '../lib/LinkedInScraper';

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
      const scraper = new LinkedInScraper(profileUrl);
      await scraper.init();

      if (await scraper.isProfilePage()) {
        const profileInfo = await scraper.getProfileInfo();
        await scraper.close();
        res.json(profileInfo);
      } else {
        await scraper.close();
        res.status(400).json({ message: 'A página carregada não é uma página de perfil do LinkedIn' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao fazer scraping do LinkedIn' });
    }
  }

}

export default new LinkedInController();
