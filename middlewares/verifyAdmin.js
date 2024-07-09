const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';


const verifyAdmin=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    var access = ""
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const role = decoded.role;
        if (role === 'admin') {
          next(); // allow access
        } else {
          return res.status(403).json({ message: "Unauthorized" });
        }
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    // next();
};
module.exports = verifyAdmin;