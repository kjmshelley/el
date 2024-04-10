const express = require("express");
const router = express.Router();
const { usersDB } = require("../../db");
const {
    getUsers,
    getUser,
    addUser,
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
        const img = await generateQRCode(email);
        const code = await generateCode(email);
        const results = await addUser({ uid, name, email, organization, img, code });
        res.status(200).json({status: results ? "success" : "failed" });
        res.status(200);
    } catch (ex) {
        console.log(ex);
        res.status(500);
    }
});

router.get("/:email", async (req, res) => {
    try {
        const users = await getUser(req.params.email);
        res.json({
            created: moment(users.at(0)).format("MM/DD/YYYY"),
            ...users.at(0)
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: "ERROR" });
    }
});

module.exports = router;