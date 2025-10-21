const Notification = require("../Schema/NotificationSchema");

const sendNotifications = async (data) => {
  const result = await Notification.create(data);

  // Get global socket.io instance
  const socketIo = global.io;

  console.log('socketIo', data?.receiver)
  if (socketIo) {
    socketIo.emit(`get-notification::${data?.receiver}`, result);    
  }
  return result;
};

module.exports = { sendNotifications };
