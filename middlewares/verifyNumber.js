// middleware/verifyPhoneNumber.js

function isValidPhoneNumber(phoneNumber) {
    // Simple regex for validating phone numbers
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }
  
  function verifyNumber(req, res, next) {
    const { phoneNumber } = req.body;
  
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }
  
    // You may add additional checks here to see if the phone number is already registered
  
    next(); // Call next middleware
  }
  
  module.exports = verifyNumber;
  