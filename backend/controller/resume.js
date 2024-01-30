const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const isAdminOrEmployer = require("../middleware/isAdminOrEmployer");
const prisma = require("../prisma/client");
const { getPaginatedResults } = require("../config/utils");
const { NOT_FOUND, ERROR_500 } = require("../config/message");
const multer = require("multer");
const fs = require("fs");

//@description     upload user resume
//@route           POST /api/resumes/upload
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
  "/upload",
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
router.delete("/:id", authMiddleware, async (req, res) => {
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
//@route           GET /api/resume
//@access          protected jobSeeker
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    const { user } = req;
    if (user.role !== "JOBSEEKER")
      return res.status(403).json({ message: ["access denied"] });
    try {
      const result = await prisma.Resume.findMany({
        where: { userId: user.id },
      });

      if (result.length > 0) {
        let temp = {
          ...result[0],
          link: `http://localhost:3001/api/resume/${result[0].data}`,
        };
        return res.json({ data: temp });
      }
      res.json({ message: [NOT_FOUND] });
    } catch (e) {
      res.status(500).send({ message: [ERROR_500] });
    }
  },
);

//@description     send resume
//@route           POST /api/users/sendResume
//@access          protected
router.post("/send", authMiddleware, async (req, res) => {
  const { user, body } = req;
  if (user.role !== "JOBSEEKER")
    return res.status(403).json({ message: ["access denied"] });

  if (!body.advertisementId)
    return res.json({
      message: ["no body provided with the key advertisementId"],
    });

  try {
    await prisma.AdvertisementResume.create({
      data: {
        userId: user.id,
        advertisementId: body.advertisementId,
      },
    });
    res.status(201).json({ message: ["رزومه با موفقیت ارسال شد"] });
  } catch (e) {
    res.status(500).send({ message: ["something went wrong"] });
  }
});

//@description     change resume state
//@route           POST /api/users/sendResume
//@access          protected
router.put(
  "/changeResumeState/:id",
  [authMiddleware, isAdminOrEmployer],
  async (req, res) => {
    const { user, body, params } = req;

    if (!body.state)
      return res.json({
        message: ["no body provided with the key state"],
      });

    try {
      await prisma.AdvertisementResume.update({
        where: { id: parseInt(params.id) },
        data: {
          status: body.state,
        },
      });
      res.json({ message: ["وضعیت با موفقیت بروزرسانی شد"] });
    } catch (e) {
      res.status(500).send({ message: ["something went wrong"] });
    }
  },
);

//@description     get applied list resume
//@route           GET /api/resumes/appliedJob
//@access          protected
router.get("/appliedJob", authMiddleware, async (req, res) => {
  const { user } = req;
  let { perPage, page, sort, search } = req.query;

  if (user.role === "JOBSEEKER") {
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
  } else if (user.role === "EMPLOYER") {
    const ids = await prisma.Advertisement.findMany({
      where: { userId: user.id },
      select: {
        id: true,
      },
    });
    let tempArr = [];
    ids?.forEach((item) => tempArr.push(item.id));
    const results = await getPaginatedResults({
      model: "AdvertisementResume",
      page: page ?? 1,
      perPage: perPage ?? 10,
      sort,
      where: {
        advertisementId: {
          in: tempArr,
        },
      },
      select: {
        id: true,
        advertisement: { include: { contract: true, category: true } },
        user: {
          select: {
            email: true,
            firstname: true,
            lastname: true,
            Resume: true,
          },
        },
        status: true,
      },
    });
    res.json(results);
  }
});

module.exports = router;
