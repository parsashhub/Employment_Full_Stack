const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { getPaginatedResults } = require("../config/utils");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const { ERROR_500 } = require("../config/message");

router.get("/", authMiddleware, async (req, res) => {
  try {
    let { perPage, page, sort, search } = req.query;
    const results = await getPaginatedResults({
      model: "JobCategory",
      page: page ?? 1,
      perPage: perPage ?? 10,
      sort,
    });
    res.send(results);
  } catch (e) {
    res.status(500).send({ message: [ERROR_500] });
  }
});

module.exports = router;
