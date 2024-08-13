import Notification from "../models/notification_model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });

    const response = notifications.map((notification) => ({
      message: notification.message,
      referralRequest: notification.referralDetails.referralRequest,
      user: notification.referralDetails.referralRequest.user,
      target_job: notification.referralDetails.target_job,
      target_company: notification.referralDetails.target_company,
    }));

    res.status(200).json({ notifications: response });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
