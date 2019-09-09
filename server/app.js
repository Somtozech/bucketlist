const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const path = require('path');

const app = express();
const Router = express.Router();
const appRoutes = require('./router');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', appRoutes(Router));

//serve static assets on production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    status: 'Internal Server Error',
    error: err
  });
});

module.exports = app;
