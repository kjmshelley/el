const express = require("express");
const router = express.Router();

const web = require("./web");
const menu = require("./api/menu");
const users = require("./api/users");

router.use("/", web);
router.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

// router.use("/api/menu", menu);
router.use("/api/users", users);


module.exports = router;