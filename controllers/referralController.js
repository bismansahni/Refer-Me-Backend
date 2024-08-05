// import ReferralRequest from '../models/referral_request_model.js';
// import User from '../models/user_model.js';
// import { addNotification } from '../services/notificationservices.js';

// // export const requestReferral = async (req, res) => {
// //     const { company_name, job_url } = req.body;
  
// //     try {
// //       const user = await User.findById(req.user.id);
  
// //       const referralRequest = new ReferralRequest({
// //         user: req.user.id,
// //         company_name,
// //         job_url,
// //         resume: user.resume,
// //       });
  
// //       await referralRequest.save();
  
// //       // Notify users in the same company
// //       const employees = await User.find({ current_company: company_name });
// //       employees.forEach(employee => {
// //         const message = `User ${user.name} requested a referral for the job at ${company_name}: ${job_url}`;
// //         addNotification(employee._id, message);
// //         console.log(`Notify ${employee.email}: ${message}`);
// //       });
  
// //       res.status(201).json(referralRequest);
// //     } catch (error) {
// //       res.status(500).json({ error: 'Referral request failed' });
// //     }
// //   };


// export const requestReferral = async (req, res) => {
//   const { company_name, job_url } = req.body;

//   try {
//     const user = await User.findById(req.user.id);

//     const referralRequest = new ReferralRequest({
//       user: req.user.id,
//       company_name,
//       job_url,
//       current_job_role: user.current_job_role,
//       current_company: user.current_company,
//       resume: user.resume,
//     });

//     await referralRequest.save();

//     // Notify users in the same company
//     const employees = await User.find({ current_company: company_name });
//     employees.forEach(employee => {
//       const message = `User ${user.name} requested a referral for the job at ${company_name}: ${job_url}`;
//       addNotification(employee._id, message, {
//         referralRequest: {
//           user: user._id,
//           resume: user.resume,
//           _id: referralRequest._id,
//         },
//         user: {
//           name: user.name,
//           resume: user.resume,
//           current_job_role: user.current_job_role,
//           current_company: user.current_company,
//         },
//         target_job: job_url,
//         target_company: company_name,
//       });
//       console.log(`Notify ${employee.email}: ${message}`);
//     });

//     res.status(201).json({
//       referralRequest: {
//         user: referralRequest.user,
//         resume: referralRequest.resume,
//         _id: referralRequest._id,
//         __v: referralRequest.__v,
//         company_name: referralRequest.company_name,
//         job_url: referralRequest.job_url
//       },
//       user: {
//         name: user.name,
//         resume: user.resume,
//         current_job_role: user.current_job_role,
//         current_company: user.current_company,
//       },
//       job_url: job_url,
//      company_name: company_name,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Referral request failed' });
//   }
// };




import User from '../models/user_model.js';
import ReferralRequest from '../models/referral_request_model.js';
import { addNotification } from '../services/notificationservices.js';

export const requestReferral = async (req, res) => {
  let { company_name, job_url } = req.body;

  if (company_name) {
    company_name = company_name.toUpperCase();
  }
  

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const referralRequest = new ReferralRequest({
      user: req.user.id,
      company_name,
      job_url,
      current_job_role: user.current_job_role,
      current_company: user.current_company,
      resume: user.resume,
    });

    await referralRequest.save();

    // Notify users in the same company
    const employees = await User.find({ current_company: company_name });
    employees.forEach(async employee => {
      const message = `User ${user.name} requested a referral for the job at ${company_name}: ${job_url}`;
      await addNotification(employee._id, message, {
        referralRequest: {
          user: {
            _id: user._id,
            name: user.name,
            resume: user.resume,
            current_job_role: user.current_job_role,
            current_company: user.current_company,
          },
          _id: referralRequest._id,
          company_name: referralRequest.company_name,
          job_url: referralRequest.job_url,
          resume: referralRequest.resume,
        },
        target_job: job_url,
        target_company: company_name,
      });
      console.log(`Notify ${employee.email}: ${message}`);
    });

    res.status(201).json({
      referralRequest: {
        user: {
          _id: user._id,
          name: user.name,
          resume: user.resume,
          current_job_role: user.current_job_role,
          current_company: user.current_company,
        },
        _id: referralRequest._id,
        company_name: referralRequest.company_name,
        job_url: referralRequest.job_url,
        resume: referralRequest.resume,
        __v: referralRequest.__v,
      },
      user: {
        name: user.name,
        resume: user.resume,
        current_job_role: user.current_job_role,
        current_company: user.current_company,
      },
      job_url: job_url,
      company_name: company_name,
    });
  } catch (error) {
    console.error('Referral request failed:', error);
    res.status(500).json({ error: 'Referral request failed' });
  }
};
