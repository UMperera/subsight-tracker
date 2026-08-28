const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    
    req.user = verified;
    
    
    next(); 
  } catch (error) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};

module.exports = verifyToken;