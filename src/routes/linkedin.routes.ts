import { Router } from 'express';
import LinkedInAPI from '../controllers/linkedin.controller';

const router = Router();

router.get('/:perfil', LinkedInAPI.getProfileInfo);

export default router;
