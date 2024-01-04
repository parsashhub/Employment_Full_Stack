const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).send({ message: ["توکن نا معتبر است"] });
  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    next();
  } catch (e) {
    res.status(401).send({ message: ["توکن نا معتبر است"] });
  }
};
