// routes/managementRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/managementController');
const authenticateToken = require('../middlewares/authenticateToken');
const verifyEmail = require('../middlewares/verifyEmail');
const verifyNumber = require('../middlewares/verifyNumber');

router.post('/register', verifyEmail,verifyNumber, register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
