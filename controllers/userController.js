import { updateUser } from '../models/userModel.js';

export const editProfile = async (req, res) => {
  const { fname, lname, email, phone } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await updateUser(userId, { fname, lname, email, phone });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
