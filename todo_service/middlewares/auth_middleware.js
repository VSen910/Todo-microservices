const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(401).json({
      status: 'fail',
      message: 'No token',
    });
  }

  const token = req.headers.authorization.trim().split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const email = decoded.email;

  req.userEmail = email;
  next();
};
