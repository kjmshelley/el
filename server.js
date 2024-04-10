require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());

const routes = require("./routes");
app.use(routes);

app.listen("3000", () => {
    console.log("started...");
});
