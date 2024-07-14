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

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.get('/api/hello', (req, res) => {
  // Respond with a JSON message
  res.json({ message: 'Hello, world!' });
});

// 3) ROUTES
app.use('/api/v1/products', productRouter);

module.exports = app;
