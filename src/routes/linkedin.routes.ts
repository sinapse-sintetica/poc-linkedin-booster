import { Router } from 'express';
import LinkedInController from '../controllers/linkedin.controller';

const router = Router();

router.get('/:perfil', LinkedInController.getProfileInfo);

export default router;
