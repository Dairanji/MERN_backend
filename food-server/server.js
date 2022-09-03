const express = require("express");
const cookie = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  session({
    cookie: { maxAge: 600000 },
    secret: "shayantan_12345",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookie());

app.use("/images", express.static(path.join(__dirname, "images")));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fieldSize: 1024 * 1024 * 5 },
  }).single("image")
);

const userAuth = require("./middlewares/userAuth");
app.use(userAuth.authJwt);

app.use(cors());

const userRoute = require("./routes/userRoute");
app.use(userRoute);

const dbriver = "";

const port = process.env.PORT || 4000;
mongoose
  .connect(dbriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Connection Successful...`);
      console.log(`Server running at http://localhost:${port}`);
    });
  });
