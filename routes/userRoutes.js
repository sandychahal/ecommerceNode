// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

// remove multer from here and add as told earlier 
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
// const verifyNumber = require('../middlewares/verifyNumber');
// const verifyEmail = require('../middlewares/verifyEmail');

router.post('/register',upload.single("pfp"), register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, upload.single('pfp'), updateProfile);


module.exports = router;
