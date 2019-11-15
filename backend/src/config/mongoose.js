import _ from 'lodash';
import logger from '../utils/logger';

const mongoose = require('mongoose');
const appConfig = require('./config');

const ENV = process.env.NODE_ENV;
const config = _.get(appConfig, ENV);
const mongoConfig = _.get(config, 'mongodb');

mongoose.connect(mongoConfig.connectionString, mongoConfig.options)
  .then(() => logger.db('Connected.'))
  .catch(() => logger.db('Connection to db error timed out'));
mongoose.set('debug', true);
module.exports = mongoose;
