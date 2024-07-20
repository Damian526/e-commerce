module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // if 500 then is error, 400 is fail
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
