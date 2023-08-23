const express = require("express");
const { verifyToken } = require("../middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

module.exports = router;
