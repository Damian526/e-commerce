const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const cors = require('cors');

// 1)Global MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many reuests from this IP, please try again in an hour',
});

app.use('/api', limiter);
// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cors());
// app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
app.use('/api/v1/products', productRouter); // ends code here if there is correct route
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
