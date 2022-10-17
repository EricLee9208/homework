//----morgan for logging server status
const { response } = require("express");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
const logger = require("morgan");
app.use(logger("dev"));

const methodOverride = require("method-override");
app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

const PORT = 3000;
const DOMAIN = "localhost";

app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on http://${DOMAIN}:${PORT}`);
});

app.get("/", (req, res) => {
  res.render("homePage");
});

const cohortRoute = require("./routes/cohort");
app.use("/cohort", cohortRoute);
