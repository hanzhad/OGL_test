import http from 'http';
import express from 'express';
import requestLogger from './utils/requestLogger';
import closingErrorHandler from './utils/closingErrorHandler';
import logger from './utils/logger';
import router from './router';

if (process.env.NODE_ENV !== 'development') {
  process.env.NODE_ENV = 'production';
}

const ENV = process.env.NODE_ENV;
logger.debug(`NODE_ENV: "${ENV}"`);

require('./config/mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(requestLogger);

if (ENV === 'development') {
  app.use('/api/public', express.static('public/'));
  app.get('/images/*', (req, res) => {
    res.sendFile(`/var/www/html/${req.path}`);
  });
} else {
  app.use('/api/public', express.static('/var/www/html/'));
}

app.use('/api/v1', router);
app.use(closingErrorHandler);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
