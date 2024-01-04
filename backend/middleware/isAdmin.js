module.exports = function (req, res, next) {
  // 401 => unauthorized
  // 403 => forbidden
  if (req.user.role !== "ADMIN")
    return res.status(403).send({ message: ["Access denied"] });
  next();
};
