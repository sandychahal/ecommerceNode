// middleware/verifyEmail.js

function isValidEmail(email) {

  // Simple regex for validating email addresses
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function verifyEmail(req, res, next) {
  console.log(req.body);
  const { email } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // You may add additional checks here to see if the email is already registered

  next(); // Call next middleware
}

module.exports = verifyEmail;

