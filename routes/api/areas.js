const express = require("express");
const router = express.Router();
const { areasDBsDB } = require("../../db");
const {
    getAreas,
    getArea,
    addArea,
    deleteArea,
} = areasDB;

router.get("/", async (req, res) => {
    const { organization, area } = req.query;
    if (!organization || !area) {
        return res.status(400).json({ status: "ERROR", message: "Please provide organization or area."});
    }
    const areas = await getAreas({ organization, area });
    res.json(areas);
});

router.get("/my", async (req, res) => {
    const { organization, area } = req.query;
    if (!organization || !area) {
        return res.status(400).json({ status: "ERROR", message: "Please provide organization or area."});
    }
    const areas = await getAreas({ organization, area });
    res.json(areas);
});

router.post("/", async (req, res) => {
    try {
        const { uid, name, email, organization } = req.body;
        const img = await generateQRCode({ uid, name, email, organization });
        const results = await addUser({ uid, name, email, organization, img });
        res.status(200).json({status: results ? "success" : "failed" });
        res.status(200);
    } catch (ex) {
        console.log(ex);
        res.status(500);
    }
});

router.get("/:email", async (req, res) => {
    const users = await getUser(req.params.email);
    res.json(users.at(0));
});

module.exports = router;