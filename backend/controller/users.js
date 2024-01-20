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

//@description     upload user resume
//@route           POST /api/user/uploadResume
//@access          protected jobSeeker
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname.slice(0, -10) + "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadStorage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post(
  "/uploadResume",
  [authMiddleware, uploadStorage.single("file")],
  async (req, res) => {
    const { body, user, file } = req;
    if (user.role !== "JOBSEEKER")
      return res.status(403).json({ message: ["access denied"] });
    try {
      await prisma.Resume.create({
        data: {
          name: file.originalname,
          data: file.filename,
          userId: user.id,
        },
      });

      res.json({ message: ["رزومه با موفقیت ذخیره شد"] });
    } catch (e) {
      res.status(500).send({ message: ["something went wrong"] });
    }
  },
);

//@description     remove user resume
//@route           POST /api/user/removeResume
//@access          protected jobSeeker
router.delete("/removeResume/:id", authMiddleware, async (req, res) => {
  const { body, user, params } = req;
  if (user.role !== "JOBSEEKER")
    return res.status(403).json({ message: ["access denied"] });

  try {
    const result = await prisma.Resume.delete({
      where: { id: parseInt(params.id) },
    });
    const filePath = __dirname.slice(0, -10) + "uploads/" + result.data;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
      } else {
        console.log("File deleted successfully");
      }
    });
    res.json({ message: ["رزومه با موفقیت حذف شد"] });
  } catch (e) {
    res.status(500).send({ message: ["something went wrong"] });
  }
});

//@description     check user resume
//@route           GET /api/user/resume
//@access          protected jobSeeker
router.get("/resume", authMiddleware, async (req, res) => {
  const { user } = req;
  if (user.role !== "JOBSEEKER")
    return res.status(403).json({ message: ["access denied"] });
  try {
    const result = await prisma.Resume.findMany({
      where: { userId: user.id },
    });
    let temp = {
      ...result[0],
      link: `http://localhost:3001/api/resume/${result[0].data}`,
    };
    res.json({ data: temp });
  } catch (e) {
    res.status(500).send({ message: ["something went wrong"] });
  }
});

//@description     send resume
//@route           POST /api/users/sendResume
//@access          protected
router.post("/sendResume", authMiddleware, async (req, res) => {
  const { user, body } = req;
  if (user.role !== "JOBSEEKER")
    return res.status(403).json({ message: ["access denied"] });

  if (!body.advertisementId)
    return res.json({
      message: ["no body provided with the key advertisementId"],
    });

  // try {
  await prisma.AdvertisementResume.create({
    data: {
      userId: user.id,
      advertisementId: body.advertisementId,
    },
  });
  res.status(201).json({ message: ["رزومه با موفقیت ارسال شد"] });
  // } catch (e) {
  //   res.status(500).send({ message: ["something went wrong"] });
  // }
});

//@description     get applied list resume
//@route           GET /api/users/appliedJob
//@access          protected
router.get("/appliedJob", authMiddleware, async (req, res) => {
  const { user } = req;
  let { perPage, page, sort, search } = req.query;

  if (user.role !== "JOBSEEKER")
    return res.status(403).json({ message: ["access denied"] });

  try {
    const results = await getPaginatedResults({
      model: "AdvertisementResume",
      page: page ?? 1,
      perPage: perPage ?? 10,
      sort,
      where: { userId: user.id },
      select: {
        advertisement: {
          include: { contract: true, category: true },
        },
        status: true,
        id: true,
      },
    });
    res.json(results);
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
