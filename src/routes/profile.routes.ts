import { Router } from 'express';
import ProfileController from '../controllers/profile.controller';

const router = Router();

router.post('/save-cookie', ProfileController.saveCookie);

export default router;