import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import mensagemRoutes from './routes/mensagem.routes';
import saudacaoRoutes from './routes/saudacao.routes';
import linkedinRoutes from './routes/linkedin.routes';

const cors = require('cors');

const swaggerFile = require('./swagger_output.json');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/mensagem', mensagemRoutes);
app.use('/saudacao', saudacaoRoutes);
app.use('/linkedin', linkedinRoutes);

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
