import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import mensagemRoutes from './routes/mensagem.routes';
import saudacaoRoutes from './routes/saudacao.routes';
const swaggerFile = require('./swagger_output.json');

const app = express();
const port = process.env.PORT || 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/mensagem', mensagemRoutes);
app.use('/saudacao', saudacaoRoutes);

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
