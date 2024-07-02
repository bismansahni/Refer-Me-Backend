const notifications = {};

export const addNotification = (userId, message) => {
  if (!notifications[userId]) {
    notifications[userId] = [];
  }
  notifications[userId].push(message);
};

export const getNotifications = (userId) => {
  return notifications[userId] || [];
};
