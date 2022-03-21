const jwt = require("jsonwebtoken");
const { Router } = require("express");

const {
  getContenders,
  postContender,
  postLogin,
  getContender,
  putContender,
  deleteContender,
  putStatus,
} = require("../queries.js");

const secretKey = process.env.SECRET_KEY;

const router = Router();

//middleware /admin
router.use((req, res, next) => {
  try {
    req.contender = jwt.verify(req.cookies.token, secretKey).data;
    next();
  } catch (err) {
    console.log(err);
  }
});

// Ruta /admin GET
router.get("/", (req, res) => {
  getContenders().then(
    (value) => {
      res.render("admin", {
        contenders: value,
      });
    },
    (reason) => {
      console.log(reason);
    }
  );
});

// Ruta /admin/status PUT
router.put("/status", (req, res) => {
  const data = Object.values(req.body);

  putStatus(data).then(
    (value) => {
      res.sendStatus(200);
    },
    (reason) => {
      console.log(reason);
    }
  );
});

module.exports = router;
