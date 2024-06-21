import jwt from 'jsonwebtoken';
// import {db} from '../dbconfig';
import { getUserBymobile,getUserByEmail, createUser, getUserById } from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const { fname, lname, email, mobile, passkey } = req.body;
    console.log(req.body);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await createUser(fname, lname, email, mobile, passkey);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { emailOrPhone, passkey, role } = req.body;
  try {
    const user = await getUserByEmailOrPhone(emailOrPhone);
    if (!user || user.passkey !== md5(passkey) || user.role !== role) {
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
