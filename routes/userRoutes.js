import express from 'express';
import { editProfile } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/edit-profile', verifyToken, editProfile);

export default router;
