const express = require("express");
const bodyParser = require("body-parser");
const bodyFormatter = require("../index");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyFormatter({ exclude: ["name"], trim: true, transform: "capitalize" })
);
app.use("/", function(req, res) {
  console.log(req.body);
  res.json(req.body);
});

app.listen(3000, () => console.log("listening...."));
