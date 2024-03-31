const express = require("express");
const router = express.Router();

const path = require("path");
const PATH_NAME = path.join(__dirname, "../../public/pages/");

router.get("/", (req, res) => {
    res.sendFile(`${PATH_NAME}/index.html`);
});

router.get("/collections/:cuuid", (req, res) => {
    res.sendFile(`${PATH_NAME}/lists.html`);
});

router.get("/words", (req, res) => {
    res.sendFile(`${PATH_NAME}/words.html`);
});

module.exports = router;