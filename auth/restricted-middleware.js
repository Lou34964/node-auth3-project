const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorizationl;
  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) =>{
      if(err){
        res.status(401).json({Message: "Invalid Login"});
      } else {
        req.user = decodedToken.user;
        next();
      }
    });
  } else {
    res.status(401).json({ Message: "Required to be logged in"})
  }
}