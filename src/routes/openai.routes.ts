import { Router } from 'express';
import { getRevisedProfile } from '../controllers/openai.controller';

const router = Router();

router.get('/:profile', getRevisedProfile);

export default router;
