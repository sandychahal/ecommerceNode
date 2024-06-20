import jwt from 'jsonwebtoken';
import { getUserByEmailOrPhone, createUser, getUserById } from '../models/userModel.js';
import { sendEmail } from '../utils/emailer.js';

export const register = async (req, res) => {
  const { fname, lname, email, phone, password } = req.body;
  try {
    const existingUser = await getUserByEmailOrPhone(email || phone);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    await createUser(fname, lname, email, phone, password);
    if (email) {
      await sendEmail(email, 'Welcome', 'Thanks for registering');
    }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { emailOrPhone, password, role } = req.body;
  try {
    const user = await getUserByEmailOrPhone(emailOrPhone);
    if (!user || user.password !== md5(password) || user.role !== role) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
