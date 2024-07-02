import mongoose from 'mongoose';

const ReferralRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company_name: String,
  job_url: String,
  resume: String,
});

const ReferralRequest = mongoose.model('ReferralRequest', ReferralRequestSchema);
export default ReferralRequest;
