import { Router } from 'express';
import { getMensagem } from '../controllers/mensagem.controller';

const router = Router();

router.get('/', getMensagem);

export default router;
