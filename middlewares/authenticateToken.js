const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If there is no token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is no longer valid

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
