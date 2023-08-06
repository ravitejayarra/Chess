const express = require('express');
const authRoutes = require('./routes/auth');
const connectDB = require('./startup/db')
const { logger, requestLoggerMiddleware, errorHandlingMiddleware } = require('./startup/Logger/winston');
const config = require('config')


if(!config.get('jwtPrivateKey')){
  logger.error("FATAL ERROR JWT TOKEN NOT SET");
  process.exit(1);
}



const app = express();


// Middleware
app.use(express.json());

app.use(requestLoggerMiddleware);

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandlingMiddleware);

const port = process.env.PORT || 3200;

// Database connection
async function startServer() {
    try {
      await connectDB();
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        logger.info(`Server is running on port ${port}`)
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  startServer();
