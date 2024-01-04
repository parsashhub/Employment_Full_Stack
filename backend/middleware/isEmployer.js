module.exports = function (req, res, next) {
  if (req.user.role !== "EMPLOYER")
    return res.status(403).send({ message: ["Access denied"] });
  next();
};
