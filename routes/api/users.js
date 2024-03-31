const express = require("express");
const router = express.Router();

const { usersDB } = require("../../db");
const {
    getUsers,
    getUser,
    addUser,
} = usersDB;

router.get("/", async (req, res) => {
    const { organization } = req.query;
    if (!organization) {
        return res.status(400).json({ status: "ERROR", message: "Please provide organization."});
    }
    const users = await getUsers({ organization });
    res.json(users);
});

router.post("/", async (req, res) => {
    const { uid, name, email, organization } = req.body;
    const results = await addUser({ uid, name, email, organization });
    res.status(200).json({status: results ? "success" : "failed" });
});

router.get("/:email", async (req, res) => {
    const users = await getUser(req.params.email);
    res.json(users.at(0));
});

module.exports = router;