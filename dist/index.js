"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Exemplo API',
            version: '1.0.0',
            description: 'Uma API simples utilizando Node.js, TypeScript e Swagger'
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'API de desenvolvimento'
            }
        ]
    },
    apis: ['./src/**/*.ts']
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
/**
 * @swagger
 * components:
 *   schemas:
 *     Mensagem:
 *       type: object
 *       required:
 *         - mensagem
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de resposta da API
 */
/**
 * @swagger
 * /mensagem:
 *   get:
 *     summary: Retorna uma mensagem
 *     responses:
 *       200:
 *         description: Mensagem obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
app.get('/mensagem', (req, res) => {
    res.json({ mensagem: 'Olá! Esta é uma API com Node.js, TypeScript e Swagger.' });
});
app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});
