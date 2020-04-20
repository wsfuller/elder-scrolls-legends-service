const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).send('No authorization token');
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).send(error);
    }
    req.user = user;
    next();
  });
}

module.exports = {
  validateToken,
};
