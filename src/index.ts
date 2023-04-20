import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import mensagemRoutes from './routes/mensagem.routes';
import linkedinRoutes from './routes/linkedin.routes';
import openaiRoutes from './routes/openai.routes';
import profileRoutes from './routes/profile.routes';
import doc from './swagger.config'

const fs = require('fs');
const https = require('https');
const cors = require('cors');
const swaggerFile = require('./swagger_output.json');

const app = express();
const port = process.env.PORT || doc.host.split(':')[1];


const corsOptions = {
  origin: '*', //'http://example.com', // Permitir apenas este domínio
  methods: ['GET', 'POST'], // Permitir apenas estes métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir apenas estes cabeçalhos
  credentials: true, // Permitir cookies
  optionsSuccessStatus: 200, // Código de status de resposta para solicitações OPTIONS
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/docs');
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/mensagem', mensagemRoutes);
app.use('/linkedin', linkedinRoutes);
app.use('/gpt35', openaiRoutes);

app.use('/api/profile', profileRoutes);

const privateKey = fs.readFileSync('server-key.pem', 'utf8');
const certificate = fs.readFileSync('server-cert.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate
};
const httpsServer = https.createServer(credentials, app);
const host = doc.host.split(':')[0];
httpsServer.listen(port, host, () => {
  console.log(`Servidor rodando em https://${host}:${port}`);
});
