import jwt from 'jsonwebtoken';
import { getUserBymobile,getUserByEmail, createUser, getUserById } from '../models/userModel.js';


export const register = (req, res) => {
  try {
    if( !fname || !lname || !(email || mobile) || passkey ){
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const { fname, lname, email, mobile, passkey } = req.body;
    const existingUserbyemail = getUserByEmail(email);
    const existingUserbymobile = getUserBymobile(mobile);
    if (existingUserbyemail) {
      return res.status(400).json({ message: 'Entered email already exists' });
    }
    if (existingUserbymobile) {
      return res.status(400).json({ message: 'Entered mobile number already exists' });
    }
   else {
    createUser(fname, lname, email, mobile, passkey);
    res.status(201).json({ message: 'User registered successfully' });}
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = (req, res) => {
  const { emailOrPhone, passkey, role } = req.body;
  try {
    const user = getUserByEmailOrPhone(emailOrPhone);
    if (!user || user.passkey !== md5(passkey) || user.role !== role) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = (req, res) => {
  try {
    const user = getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
