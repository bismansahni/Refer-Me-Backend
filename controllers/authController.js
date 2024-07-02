import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
      const user = new User({ name, email, password });
      await user.save();
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(201).json({ token ,name});
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(200).json({ token ,name: user.name});
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  };