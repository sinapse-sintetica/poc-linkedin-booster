import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import mensagemRoutes from './routes/mensagem.routes';
import linkedinRoutes from './routes/linkedin.routes';
import openaiRoutes from './routes/openai.routes';

const cors = require('cors');

const swaggerFile = require('./swagger_output.json');

const app = express();
const port = process.env.PORT || 3042;

app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.redirect('/docs');
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/mensagem', mensagemRoutes);
app.use('/linkedin', linkedinRoutes);
app.use('/gpt35', openaiRoutes)

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
