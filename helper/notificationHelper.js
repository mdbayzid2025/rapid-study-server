const Notification = require("../Schema/NotificationSchema");

const sendNotifications = async (data) => {
  const result = await Notification.create(data);

  // Get global socket.io instance
  const socketIo = global.io;

  if (socketIo) {
    // socketIo.emit(`get-notification::${data?.receiver}`, result);
    socketIo.emit(`get-notification::123456789`, result);
  }
  return result;
};

module.exports = { sendNotifications };
