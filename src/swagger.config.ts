import swaggerAutogen from 'swagger-autogen';

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/index.ts'];

const doc = {
  swagger: '2.0',
  info: {
    title: 'Exemplo API',
    version: '1.0.0',
    description: 'Uma API simples utilizando Node.js, TypeScript e Swagger-autogen'
  },
  basePath: '/',
  schemes: ['https'],
  host: '0.0.0.0:3042'
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger-autogen completo.');
});
