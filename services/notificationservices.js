// // const notifications = {};

// // export const addNotification = (userId, message) => {
// //   if (!notifications[userId]) {
// //     notifications[userId] = [];
// //   }
// //   notifications[userId].push(message);
// // };

// // export const getNotifications = (userId) => {
// //   return notifications[userId] || [];
// // };


// const notifications = {};

// export const addNotification = (userId, message, referralDetails) => {
//   if (!notifications[userId]) {
//     notifications[userId] = [];
//   }
//   notifications[userId].push({ message, referralDetails });
// };

// export const getNotifications = (userId) => {
//   return notifications[userId] || [];
// };





import Notification from '../models/notification_model.js';

export const addNotification = async (userId, message, referralDetails) => {
  const notification = new Notification({
    userId,
    message,
    referralDetails,
  });
  await notification.save();
  console.log(`Notification added for user ${userId}:`, { message, referralDetails });
};
