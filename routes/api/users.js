const moment = require("moment");
const express = require("express");
const router = express.Router();
const { usersDB } = require("../../db");
const {
    getUsers,
    getUser,
    addUser,
    checkUser,
} = usersDB;

const {
    generateQRCode,
    generateCode,
} = require("../../etc/helpers");

router.get("/", async (req, res) => {
    const { organization } = req.query;
    if (!organization) {
        return res.status(400).json({ status: "ERROR", message: "Please provide organization."});
    }
    const users = await getUsers({ organization });
    res.json(users);
});

router.post("/", async (req, res) => {
    try {
        const { uid, name, email, organization } = req.body;
        const img = await generateQRCode(`${email}-${moment().format("MM/DD/YYYY HH:MM:SS").replace(/ /g, "-")}`);
        const code = await generateCode(email);
        const results = await addUser({ uid, name, email, organization, img, code });
        res.status(200).json({status: results ? "success" : "failed" });
        res.status(200);
    } catch (ex) {
        console.log(ex);
        res.status(500);
    }
});

router.get("/check", async (req, res) => {
    try {
        const {
            qr,
            code
        } = req.query;

        // make sure qr is not expired
        // make sure qr email = req.query email
        // check code 
        const data = await checkUser(code);
        console.log(data);
        if (data.length > 0) {
            res.status(200).json({ status: "FOUND" });
        } else {
            res.status(404).json({ status: "NOT FOUND"});
        }
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: "ERROR" });
    }
});

router.get("/rooms", async (req, res) => {
    try {
        const {
            qr,
            code
        } = req.query;

        // make sure qr is not expired
        // make sure qr email = req.query email
        // check code 
        const data = await checkUser(code);
        //console.log(data);
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json([]);
        }
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: "ERROR" });
    }
});

router.get("/:email", async (req, res) => {
    try {
        const users = await getUser(req.params.email);
        res.json({
            ...users.at(0),
            qrcodeurl: `https://entrylistapi.onrender.com/qr/${users.at(0).email}`,
            created: moment(users.at(0)).format("MM/DD/YYYY"),
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: "ERROR" });
    }
});

module.exports = router;