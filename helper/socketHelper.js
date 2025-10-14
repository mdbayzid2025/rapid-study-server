const { logger } = require('../shared/logger'); // CommonJS require
const colors = require('colors');

function socket(io) {
  io.on('connection', (socket) => {
    logger.info(colors.blue('A user connected'));

    // disconnect
    socket.on('disconnect', () => {
      logger.info(colors.red('A user disconnected'));
    });
  });
}

exports.socketHelper = { socket }; // CommonJS export
