const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const Joi = require("joi");
const prisma = require("../prisma/client");
const { getPaginatedResults } = require("../config/utils");
const { NOT_FOUND, ERROR_500 } = require("../config/message");

//@description     user info
//@route           GET /api/user/me
//@access          protected
router.get("/", authMiddleware, async (req, res) => {
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
      select: {
        id: true,
        title: true,
        companyName: true,
        companyWebsite: true,
        companyLogo: true,
        location: true,
        minWorkExperience: true,
        salary: true,
        contract: true,
        category: true,
      },
    });
    res.send(result);
  } catch (e) {
    res.status(500).json({ message: [ERROR_500] });
  }
});

module.exports = router;
