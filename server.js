const express = require("express");
const path = require("path/posix");
const fs = require("fs");
const ejs = require("ejs");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static("static"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  const subs = fs.readdirSync("./static");
  const subjects = subs.map((sub) => {
    const jsonfile = fs.readFileSync(
      path.join("./static", sub, `${sub}.json`),
      { encoding: "utf-8" }
    );
    return JSON.parse(jsonfile);
  });
  res.render("index.ejs", { subjects, list: subs });
});


app.listen(3000)