import ReferralRequest from '../models/referral_request_model.js';
import User from '../models/user_model.js';
import { addNotification } from '../services/notificationservices.js';

export const requestReferral = async (req, res) => {
    const { company_name, job_url } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
  
      const referralRequest = new ReferralRequest({
        user: req.user.id,
        company_name,
        job_url,
        resume: user.resume,
      });
  
      await referralRequest.save();
  
      // Notify users in the same company
      const employees = await User.find({ current_company: company_name });
      employees.forEach(employee => {
        const message = `User ${user.name} requested a referral for the job at ${company_name}: ${job_url}`;
        addNotification(employee._id, message);
        console.log(`Notify ${employee.email}: ${message}`);
      });
  
      res.status(201).json(referralRequest);
    } catch (error) {
      res.status(500).json({ error: 'Referral request failed' });
    }
  };