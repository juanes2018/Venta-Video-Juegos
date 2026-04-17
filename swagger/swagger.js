const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Venta de Video Juegos Retro Online',
      version: '1.0.0',
      description: 'Documentación de la API de videojuegos con autenticación',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor de Desarrollo',
      },
    ],
    // ESTO ES NUEVO: Necesario para que el candado de autenticación funcione
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // CORRECCIÓN DE RUTA: './src/routes/*.js' para entrar a la carpeta correctamente
  apis: ['./src/routes/*.js'], // Rutas donde buscar anotaciones de Swagger
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
