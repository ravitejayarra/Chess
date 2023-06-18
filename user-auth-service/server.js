const express = require('express');
const authRoutes = require('./routes/auth');
const connectDB = require('./startup/db')
const { logger, requestLoggerMiddleware, errorHandlingMiddleware } = require('./startup/Logger/winston');


const app = express();


// Middleware
app.use(express.json());

app.use(requestLoggerMiddleware);

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandlingMiddleware);

const port = process.env.PORT || 3000;

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
