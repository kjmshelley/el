const moment = require("moment");
const express = require("express");
const router = express.Router();
const { readFile } = require("fs/promises");

const path = require("path");
const PATH_NAME = path.join(__dirname, "../../public/pages/");

const { usersDB } = require("../../db");
const { getUser, } = usersDB;

const {
    generateQRCode,
} = require("../../etc/helpers");

let FILE_HTML = "";
(async () => {
    FILE_HTML = await readFile(`${PATH_NAME}/qrcode.html`);
})();

// router.get("/", (req, res) => {
//     res.sendFile(`${PATH_NAME}/index.html`);
// });

// router.get("/organizations", (req, res) => {
//     res.sendFile(`${PATH_NAME}/organizations.html`);
// });

router.get("/qr/:email", async (req, res) => {
    let html = `${FILE_HTML}`;
    let { email } = req.params;
    let qr = "";
    if (email) {
        const users = await getUser(email);
        qr = await generateQRCode(`${users.at(0).email}-${moment().format("MM/DD/YYYY HH:MM:SS").replace(/ /g, "-")}`);
    } else {
        qr = await generateQRCode("NOT FOUND");
    }
    html = html.replace("{{IMG_SRC}}", qr);
    res.send(html);
});

module.exports = router;