import { getNotifications } from '../services/notificationservices.js';

export const getUserNotifications = (req, res) => {
  const notifications = getNotifications(req.user.id);
  res.status(200).json({ notifications });
};
