import Notification from "../models/notification_model.js";

export const addNotification = async (userId, message, referralDetails) => {
  const notification = new Notification({
    userId,
    message,
    referralDetails,
  });
  await notification.save();
  console.log(`Notification added for user ${userId}:`, {
    message,
    referralDetails,
  });
};
