// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const verifyEmail = require('../middlewares/verifyEmail');
const verifyNumber = require('../middlewares/verifyNumber');
// const verifyNumber = require('../middlewares/verifyNumber');
// const verifyEmail = require('../middlewares/verifyEmail');

router.post('/register',verifyEmail,verifyNumber, register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
