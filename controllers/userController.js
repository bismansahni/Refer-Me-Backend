import User from '../models/user_model.js';
export const updateProfile = async (req, res) => {
    const { current_job_role, current_company, resume } = req.body;
    
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { current_job_role, current_company, resume },
        { new: true, runValidators: true }
      );
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Profile update failed' });
    }
  };


  export const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile data' });
    }
  };