const express = require('express');
const mongoose = require('mongoose');
const routes = require('./api/routes/studentRoutes');
const errHandler = require('./api/middleware/errHandler');
const net = require('net');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Функция для поиска доступного порта
function findAvailablePort(startingPort, callback) {
  const server = net.createServer();

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      findAvailablePort(startingPort + 1, callback);
    } else {
      throw err;
    }
  });

  server.listen(startingPort, () => {
    const port = server.address().port;
    server.close(() => {
      callback(port);
    });
  });
}

// Генерация Swagger JSON
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Students API',
      version: '1.0.0',
      description: 'API for managing student data',
    },
  },
  apis: ['./api/routes/studentRoutes.js'],
};

const specs = swaggerJsdoc(options);

// Поиск доступного порта
findAvailablePort(4000, (port) => {
  console.log(`Found available port: ${port}`);

  // Создание Express-приложения и установка порта
  const app = express();
  const hostname = '127.0.0.1';

  // Подключение к базе данных MongoDB
  mongoose.connect('mongodb://localhost:27017/studentsdb', { useNewUrlParser: true, useUnifiedTopology: true });

  // Middleware для работы с JSON и закодированными URL-данными
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware для обработки CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  // Middleware для Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  // Подключение маршрутов
  app.use(routes);

  // Middleware для обработки ошибок
  app.use(errHandler);

  // Слушаем указанный порт и хост
  app.listen(port, hostname, () => {
    console.log(`Server running ${hostname} on ${port}`);
  });
});