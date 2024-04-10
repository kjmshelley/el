const express = require("express");
const router = express.Router();
const { readFile } = require("fs/promises");

const path = require("path");
const PATH_NAME = path.join(__dirname, "../../public/pages/");

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

router.get("/qr", async (req, res) => {
    let html = `${FILE_HTML}`;
    let { qr } = req.query;
    console.log(encodeURIComponent(req.query.qr));
    if (!req.query.qr) {
        qr = await generateQRCode("NOT FOUND");
    } else {
        qr = encodeURIComponent(req.query.qr);
    }
    html = html.replace("{{IMG_SRC}}", qr);
    res.send(html);
});

module.exports = router;