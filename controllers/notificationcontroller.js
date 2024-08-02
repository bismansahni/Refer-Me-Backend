import { getNotifications } from '../services/notificationservices.js';

// export const getUserNotifications = (req, res) => {
//   const notifications = getNotifications(req.user.id);
//   res.status(200).json({ notifications });
// };

export const getUserNotifications = (req, res) => {
  const notifications = getNotifications(req.user.id);

  const response = notifications.map(notification => ({
    message: notification.message,
    referralRequest: notification.referralDetails.referralRequest,
    user: notification.referralDetails.user,
    target_job: notification.referralDetails.target_job,
    target_company: notification.referralDetails.target_company,
  }));

  res.status(200).json({ notifications: response });
};
