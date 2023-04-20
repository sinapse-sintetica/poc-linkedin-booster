import { Request, Response } from 'express';

class ProfileController {
    async saveCookie(req: Request, res: Response): Promise<void> {
        const cookieValue = req.body.cookieValue;
        console.log('cookie recebido', cookieValue);
        res.cookie('li_at', cookieValue);
        res.status(200).send(cookieValue);
    }
}

export default new ProfileController();