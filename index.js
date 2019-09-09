const { createServer } = require('http');
const app = require('./server/app');
const config = require('./server/config');
const logger = require('./server/logger');
const database = require('./server/database');

const server = createServer(app);

server.listen(config.port);

server.on('listening', async () => {
  logger.log(`Server is running at port ${config.port}`);
  await database.connect(config.mongoURI);
});

server.on('error', error => {
  logger.error(error);
  process.exit(1);
});
