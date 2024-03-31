const express = require("express");
const router = express.Router();

const users = require("./api/users");

router.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
router.use("/api/users", users);

module.exports = router;