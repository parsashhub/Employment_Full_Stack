const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authMiddleware = require("../middleware/authMiddleware");
const isEmployer = require("../middleware/isEmployer");
const isAdmin = require("../middleware/isAdmin");
const Joi = require("joi");
const prisma = require("../prisma/client");
const { getPaginatedResults } = require("../config/utils");
const {
  NOT_FOUND,
  ERROR_500,
  CREATE_ADVERTISEMENT,
  UPDATE_ADVERTISEMENT,
  DELETE_ADVERTISEMENT,
} = require("../config/message");

//@description     get advertisements list for dashboard
//@route           GET /api/advertisements
//@access          protected
router.get("/", authMiddleware, async (req, res) => {
  const { user } = req;
  try {
    let { perPage, page, sort, search } = req.query;
    let where =
      user.id === "EMPLOYER"
        ? { isShared: true, userId: user.id }
        : { isShared: true };
    console.log(where);
    const result = await getPaginatedResults({
      model: "Advertisement",
      page: page ?? 1,
      perPage: perPage ?? 10,
      searchColumns: ["title", "companyName", "location"],
      searchText: search,
      sort,
      where,
      include: {
        contract: true,
        category: true,
      },
    });
    res.send(result);
  } catch (e) {
    res.status(500).json({ message: [ERROR_500] });
  }
});

//@description     get advertisements list
//@route           GET /api/advertisements/list
//@access          public
router.get("/list", async (req, res) => {
  try {
    let { perPage, page, sort, search } = req.query;
    const result = await getPaginatedResults({
      model: "Advertisement",
      page: page ?? 1,
      perPage: perPage ?? 10,
      searchColumns: ["title", "companyName", "location"],
      searchText: search,
      sort,
      where: { isShared: true },
      include: {
        contract: true,
        category: true,
      },
    });
    res.send(result);
  } catch (e) {
    res.status(500).json({ message: [ERROR_500] });
  }
});

//@description     create advertisement
//@route           Post /api/advertisements
//@access          protected EMPLOYER
router.post("/", authMiddleware, async (req, res) => {
  const { user, body } = req;
  const { error } = validateCreate(body);
  if (error) return res.status(400).send({ message: error });

  try {
    const result = await prisma.Advertisement.create({
      data: { ...body, userId: user.id },
    });
    res.status(201).json({ data: result, message: [CREATE_ADVERTISEMENT] });
  } catch (e) {
    res.status(500).json({ message: [ERROR_500] });
  }
});

//@description     update advertisement
//@route           Put /api/advertisements
//@access          protected EMPLOYER
router.put("/:id", authMiddleware, async (req, res) => {
  const { user, body, params } = req;
  if (!Number(params.id))
    return res.status(404).json({ message: ["no url params provided"] });

  const { error } = validateUpdate(body);
  if (error) return res.status(400).send({ message: error });

  try {
    const isExisting = await prisma.Advertisement.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!isExisting) return res.status(404).json({ message: [NOT_FOUND] });

    if (isExisting.userId !== user.id)
      return res.status(403).json({
        message: "هر کاربر فقط آگهی های مربوط به خود را می تواند ویرایش کند",
      });

    const result = await prisma.Advertisement.update({
      where: { id: parseInt(params.id) },
      data: body,
    });
    res.json({ data: result, message: [UPDATE_ADVERTISEMENT] });
  } catch (e) {
    res.status(500).json({ message: [ERROR_500] });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { params, user } = req;
  if (!Number(params.id))
    return res.status(404).json({ message: ["no url params provided"] });

  try {
    const isExisting = await prisma.Advertisement.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!isExisting) return res.status(404).json({ message: [NOT_FOUND] });

    if (isExisting.userId !== user.id)
      return res.status(403).json({
        message: "هر کاربر فقط آگهی های مربوط به خود را می تواند حذف کند",
      });

    await prisma.Advertisement.delete({ where: { id: parseInt(params.id) } });
    res.json({ message: [DELETE_ADVERTISEMENT] });
  } catch (e) {
    res.status(500).json({ message: [ERROR_500] });
  }
});

function validateCreate(user) {
  const schema = Joi.object().keys({
    title: Joi.string().min(5).max(250).required(),
    companyName: Joi.string().min(5).max(100).required(),
    companyWebsite: Joi.string().min(5).max(100).required(),
    companyLogo: Joi.string().empty(""),
    companySize: Joi.number().required(),
    location: Joi.string().required(),
    jobDescription: Joi.string().min(10).max(1000).required(),
    companyDescription: Joi.string().min(10).max(1000).required(),
    minWorkExperience: Joi.number().required(),
    isShared: Joi.boolean().required(),
    salary: Joi.number().required(),
    contractId: Joi.number().required(),
    categoryId: Joi.number().required(),
  });

  return schema.validate(user, { abortEarly: false });
}

function validateUpdate(user) {
  const schema = Joi.object().keys({
    title: Joi.string().min(5).max(250).empty(""),
    companyName: Joi.string().min(5).max(100).empty(""),
    companyWebsite: Joi.string().min(5).max(100).empty(""),
    companyLogo: Joi.string().empty(""),
    companySize: Joi.number(),
    location: Joi.string().empty(""),
    jobDescription: Joi.string().min(10).max(1000).empty(""),
    companyDescription: Joi.string().min(10).max(1000).empty(""),
    minWorkExperience: Joi.number(),
    isShared: Joi.boolean(),
    salary: Joi.number(),
    contractId: Joi.number(),
    categoryId: Joi.number(),
  });

  return schema.validate(user, { abortEarly: false });
}

module.exports = router;
