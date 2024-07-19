const express = require('express');
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');
const app = express();
const cors = require('cors');

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
app.use('/api/v1/products', productRouter);
app.all('*', (req, res, next) => {
  /* res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  }); */
  const err = new Error(`Can't find ${req.originalUrl} on this server `);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // if 500 then is error, 400 is fail
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
module.exports = app;
