import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  generateOTP,
  sendOTPEmail,
  storeOTP,
  verifyOTP,
  removeOTP,
} from "./otputils.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const otp = generateOTP();
    await sendOTPEmail(email, otp);

    storeOTP(email, name, password, otp);

    res
      .status(201)
      .json({
        message:
          "OTP sent to your email. Please verify to complete registration.",
      });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const verifyUserOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = verifyOTP(email, otp);

    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const { name, password } = otpRecord;

    console.log("Creating user with details:", { name, email, password });

    const user = new User({ name, email, password });
    await user.save();

    console.log("User created successfully:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("JWT token generated:", token);

    removeOTP(email);

    res.status(200).json({ token, name });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, name: user.name });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
