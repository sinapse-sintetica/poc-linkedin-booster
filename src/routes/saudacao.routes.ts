import express from 'express';
import { getSaudacao } from '../controllers/saudacao.controller';

const router = express.Router();

router.get('/', getSaudacao);

export default router;
