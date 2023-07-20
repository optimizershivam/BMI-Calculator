require("dotenv").config;
var jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token,{authHeader})
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (error, user) => {
      if (error) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  }

  module.exports = authenticateToken