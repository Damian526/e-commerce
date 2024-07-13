const express = require('express');
const morgan = require('morgan');
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.get('/api/hello', (req, res) => {
  // Respond with a JSON message
  res.json({ message: 'Hello, world!' });
});

module.exports = app;
