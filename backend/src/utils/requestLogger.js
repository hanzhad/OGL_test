import _ from 'lodash';
import moment from 'moment';
import logger from './logger';

const regexs = [
  /(.+)\.(js|css|woff.?|png|ico)$/g,
  /X_LOCAL_SECURITY_COOKIE/g,
];

const urlsWithDisabledLogs = [

];

const urlsThatIsShowedOnStart = [

];

const devUrls = [

];

const writeLog = (req, log) => {
  logger.http(log);
};

const requestLogger = (req, res, next) => {
  const { method, originalUrl } = req;
  const start = Date.now();
  const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (_.some(regexs, (x) => originalUrl.match(x))) {
    return next();
  }

  if (_.some(urlsWithDisabledLogs, (x) => _.includes(originalUrl, x))) {
    return next();
  }

  if (_.some(devUrls, (x) => _.includes(originalUrl, x))) {
    console.info(`[${moment().toISOString()}] - ${clientIp} - [DEV_LOG] ${method} ${originalUrl}`);
  }

  if (_.some(urlsThatIsShowedOnStart, (x) => _.includes(originalUrl, x))) {
    writeLog(req, `${clientIp} - ${method} ${originalUrl} - Request started.`);
  }

  res.on('finish', () => {
    const { statusCode, statusMessage } = res;
    const contentSize = res.get('Content-Length') || 0;
    const responseTime = Date.now() - start;
    const log = `${clientIp} - ${method} ${originalUrl} - ${statusCode} [${statusMessage}] (${contentSize}b sent in ${responseTime} ms)`;
    writeLog(req, log);
  });

  return next();
};

export default requestLogger;
