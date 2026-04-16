require('dotenv').config();
const express = require('express');
const LoggerMiddleware = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const openapiSpecification = require('../swagger/swagger')
const swaggerUi = require('swagger-ui-express');


const routes = require('./routes');

const db = require('./config/db');
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(LoggerMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use('/api/v1', routes);

 


//app.use('/api/v1', require('./routes'));

app.get('/', (req, res) => {
    res.send(`<h1>HELLO WORLD</h1>
        <p>Esta Plataforma es una Aplicacion Node.js con Express</p>
        <p>Corre en el puerto ${PORT}</p>`);
});

app.get('/api/v1/hello', (req,res)=>{
 res.send("Hello World");
});


app.use(errorHandler);

module.exports = app;