const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY || '';
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).send();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return res.status(401).send();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(401).send();
  }
  if (!decodedToken) {
    return res.status(403).send();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};