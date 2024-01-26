const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { getPaginatedResults } = require("../config/utils");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const { ERROR_500, UPDATE, DELETE, CREATE } = require("../config/message");

//@description     get job category list
//@route           GET /api/jobCategories
//@access          protected
router.get("/", async (req, res) => {
  try {
    let { perPage, page, sort, search } = req.query;
    const results = await getPaginatedResults({
      model: "JobCategory",
      page: page ?? 1,
      perPage: perPage ?? 10,
      searchColumns: ["title"],
      searchText: search,
      sort,
    });
    res.send(results);
  } catch (e) {
    res.status(500).send({ message: [ERROR_500] });
  }
});

//@description     create job category
//@route           POST /api/jobCategories
//@access          protected
router.post("/", [authMiddleware, isAdmin], async (req, res) => {
  const { body } = req;
  if (!body.title)
    return res.status(400).json({ message: ["no body provided"] });

  try {
    const jobCategory = await prisma.jobCategory.create({
      data: {
        title: body.title,
      },
    });

    res.json({
      data: jobCategory,
      message: [CREATE],
    });
  } catch (error) {
    res.status(500).send({ message: [ERROR_500] });
  }
});

//@description     update job category
//@route           PUT /api/jobCategories/:id
//@access          protected
router.put("/:id", [authMiddleware, isAdmin], async (req, res) => {
  const { body, params } = req;
  if (!body.title)
    return res.status(400).json({ message: ["no body provided"] });

  try {
    const updatedJobCategory = await prisma.jobCategory.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
      },
    });

    res.json({ data: updatedJobCategory, message: [UPDATE] });
  } catch (error) {
    res.status(500).send({ message: [ERROR_500] });
  }
});

//@description     delete job category
//@route           DELETE /api/jobCategories/:id
//@access          protected
router.delete("/:id", [authMiddleware, isAdmin], async (req, res) => {
  const { params } = req;
  try {
    const deletedJobCategory = await prisma.jobCategory.delete({
      where: { id: parseInt(params.id) },
    });
    res.json({ data: deletedJobCategory, message: [DELETE] });
  } catch (error) {
    res.status(500).send({ message: [ERROR_500] });
  }
});

module.exports = router;
