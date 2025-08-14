const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  try {
      const token = req.cookies.accessToken;
  
      console.log("tttttoken", token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  } 
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded", decoded)
    req.user = decoded; // Contains user's role, id, etc.
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
