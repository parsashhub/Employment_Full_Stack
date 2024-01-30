const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const Joi = require("joi");
const prisma = require("../prisma/client");
const { hashPassword, getPaginatedResults } = require("../config/utils");
const { NOT_FOUND, ERROR_500 } = require("../config/message");
const multer = require("multer");
const fs = require("fs");

//@description     user info
//@route           GET /api/user/me
//@access          protected
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    res.json({ data: _.omit(user, ["createdAt", "updatedAt", "password"]) });
  } catch (e) {
    res.status(404).json({ message: [NOT_FOUND] });
  }
});

//@description     update user data
//@route           GET /api/user/:id
//@access          protected
router.put("/:id", authMiddleware, async (req, res) => {
  const { params, body } = req;
  const { error } = validateUpdate(body);
  if (error) return res.status(400).send({ message: error });

  const { firstname, lastname, phoneNumber } = body;
  try {
    const user = await prisma.user.update({
      where: { id: params.id },
      data: { firstname, lastname, phoneNumber },
    });
    if (!user) return res.status(404).send({ message: [NOT_FOUND] });

    res.send({
      data: _.omit(user, ["password", "createdAt", "updatedAt", "role"]),
      message: ["اطلاعات حساب ویرایش شد"],
    });
  } catch (e) {
    res.status(500).send({ message: [ERROR_500] });
  }
});

//@description     change password
//@route           GET /api/user/changePassword
//@access          protected
router.post("/changePassword", authMiddleware, async (req, res) => {
  const { body, user: userReq } = req;
  const { error } = validateChangePassword(body);
  if (error) return res.status(400).send({ message: error });

  const { currentPassword, newPassword } = body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userReq.id },
    });
    if (!user) return res.status(404).send({ message: ["کاربری یافت نشد"] });

    const validPsw = await bcrypt.compare(currentPassword, user.password);
    if (!validPsw)
      return res.status(400).send({ message: ["رمز عبور صحیح نیست"] });

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: passwordHash },
    });

    res.send({ message: ["رمز عبور با موفقیت تغییر یافت"] });
  } catch (e) {
    res.status(500).send({ message: ["something went wrong"] });
  }
});

//@description     get users list
//@route           POST /api/user
//@access          protected admin
router.get("/", [authMiddleware, isAdmin], async (req, res) => {
  try {
    let { perPage, page, sort, search } = req.query;
    const usersList = await getPaginatedResults({
      model: "user",
      page: page ?? 1,
      perPage: perPage ?? 10,
      sort,
      where: { isActive: true },
      select: {
        id: true,
        role: true,
        phoneNumber: true,
        email: true,
        firstname: true,
        lastname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.send(usersList);
  } catch (e) {
    res.status(500).send({ message: [ERROR_500] });
  }
});

//@description     delete account
//@route           POST /api/user/deleteAccount
//@access          protected
router.post("/deleteAccount", authMiddleware, async (req, res) => {
  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      phoneNumber: null,
      email: "",
      firstname: null,
      lastname: null,
      isActive: false,
    },
  });
  res.json({ message: ["حساب کاربری شما با موفقیت حذف شد"] });
});

function validateUpdate(user) {
  const schema = Joi.object().keys({
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    phoneNumber: Joi.string().min(10).required(),
  });

  return schema.validate(user, { abortEarly: false });
}

function validateChangePassword(user) {
  const schema = Joi.object().keys({
    currentPassword: Joi.string().min(6).max(255).required(),
    newPassword: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user, { abortEarly: false });
}

module.exports = router;
