import express from 'express';
import { getMensagem } from '../controllers/mensagem.controller';

const router = express.Router();

router.get('/', getMensagem);

export default router;
