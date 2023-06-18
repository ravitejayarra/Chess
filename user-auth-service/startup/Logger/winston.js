const winston = require('winston');
const expressWinston = require('express-winston');

// Logger setup
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

// Request logging middleware
const requestLoggerMiddleware = expressWinston.logger({
  transports: logger.transports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: false,
  expressFormat: true,
  colorize: true,
});

// Error handling middleware
const errorHandlingMiddleware = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Something went wrong.');
};

module.exports = {
  logger,
  requestLoggerMiddleware,
  errorHandlingMiddleware,
};
