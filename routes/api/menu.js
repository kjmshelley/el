const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const menu = [
        { menuItem: "Organizations", menuLink: "/organizations" },
        { menuItem: "Users", menuLink: "/users" },
        { menuItem: "Areas", menuLink: "/areas" },
        { menuItem: "Groups", menuLink: "/groups" },
    ];
    res.json(menu);
});

module.exports = router;