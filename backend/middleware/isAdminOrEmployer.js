module.exports = function (req, res, next) {
  const { user } = req;
  if (user.role !== "ADMIN" && user.role !== "EMPLOYER")
    return res.status(403).send({ message: ["access denied"] });
  next();
};
