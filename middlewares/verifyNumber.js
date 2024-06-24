// middleware/verifyPhoneNumber.js

function isValidPhoneNumber(mobile) {
  // Simple regex for validating phone numbers
  const phoneRegex =  /^\d{10}$/;
  return phoneRegex.test(mobile);
}

function verifyNumber(req, res, next) {
  const { mobile } = req.body;

  if (!mobile || !isValidPhoneNumber(mobile)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  // You may add additional checks here to see if the phone number is already registered

  next(); // Call next middleware
}

module.exports = verifyNumber;