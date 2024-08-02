import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  referralDetails: {
    referralRequest: {
      user: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        resume: String,
        current_job_role: String,
        current_company: String,
      },
      _id: mongoose.Schema.Types.ObjectId,
      company_name: String,
      job_url: String,
      resume: String,
    },
    target_job: String,
    target_company: String,
  },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
