const bcrypt = require("bcrypt");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");
const authMiddleware = require("../middleware/authMiddleware");
const { hashPassword } = require("../config/utils");

//@description     login
//@route           POST /api/auth
//@access          public
router.post("/signIn", async (req, res) => {
  const { body } = req;
  const { error } = validate(body);

  if (error) return res.status(400).send({ message: error });

  const { email, password } = body;
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user)
    return res.status(400).send({ message: ["ایمیل یا رمز عبور نامعتبر است"] });

  const validPsw = await bcrypt.compare(password, user.password);
  if (!validPsw)
    return res.status(400).send({ message: ["ایمیل یا رمز عبور نامعتبر است"] });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_PRIVATE_KEY,
  );

  res.send({
    data: _.omit(user, ["resume", "createdAt", "updatedAt", "password"]),
    token,
  });
});

//@description     create user (sign up)
//@route           POST /api/user
//@access          public
router.post("/signUp", async (req, res) => {
  const { body } = req;
  const { error } = validateCreateUser(body);
  if (error) return res.status(400).send({ message: error });

  const { email, password } = body;
  let user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) return res.status(400).send({ message: ["ایمیل قبلا ثبت شده"] });

  try {
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { ...body, password: passwordHash },
    });
    res.status(201).send({
      message: ["کاربر با موفقیت ثبت شد"],
    });
  } catch (e) {
    res.status(400).send({ message: ["role is not correct"] });
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(req, { abortEarly: false });
}

function validateCreateUser(user) {
  const schema = Joi.object().keys({
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().empty(""),
    role: Joi.string().required(),
  });

  return schema.validate(user, { abortEarly: false });
}

module.exports = router;
