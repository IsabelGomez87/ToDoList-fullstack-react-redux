/* eslint-disable no-debugger */
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const { connect } = require('mongoose');
require('dotenv').config();

const server = express();
const port = 1305;

connect(
  process.env.DDBB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => debug('tot be'))
  .catch((error) => debug(error));

server.use(cors());

server.use(express.json());
server.use(morgan('tiny'));

const tasksRouter = require('./routes/tasksRouter');

server.use('/to-do-list', tasksRouter);

server.listen(port,
  () => debug(`Server is running in ${chalk.magentaBright(port)}`));
