const jwt = require("jsonwebtoken");
const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const admin = require("./routes/admin.route");
const bodyParser = require("body-parser");

//queries
const {
  getContenders,
  postContender,
  postLogin,
  getContender,
  putContender,
  deleteContender,
  putStatus,
} = require("./queries.js");

//LLavesecret
const secretKey = process.env.SECRET_KEY;

//express
const app = express();
const port = process.env.PORT || 4000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

//json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//acceso a carpeta raiz y bootstrap
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use("/js", express.static("node_modules/axios/dist"));

//Configuracion handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//Cookie
app.use(cookieParser());

//fileupload
// const expressFileUpload = require('express-fileupload')
// app.use(expressFileUpload({
//   limits: {
//     fileSize: 20000000
//   },
//   abortOnLimit: true,
//   responseOnLimit: "El peso del archivo que intentas subir es superior a 20MB."
// }))

//Ruta /
app.get("/", (req, res) => {
  getContenders().then(
    (value) => {
      res.render("main", {
        contenders: value,
      });
    },
    (reason) => {
      console.log(reason);
    }
  );
});

//Ruta /contenders
app.get("/contenders", (req, res) => {
  getContenders().then(
    (value) => {
      res.json(value);
    },
    (reason) => {
      console.log(reason);
    }
  );
});

//Ruta /register
app.get("/register", (req, res) => {
  res.render("register", {});
});

//Ruta /contenders
app.post("/contenders", upload.single("foto"), (req, res) => {
  const data = Object.values(req.body);
  data.push(req.file.filename);
  data.push(false);
  data.splice(3, 1);
  postContender(data).then(
    (value) => {
      res.redirect("/");
    },
    (reason) => {
      console.log(reason);
    }
  );
});

// Ruta /login GET
app.get("/login", (req, res) => {
  res.render("login", {});
});

// Ruta /login POST
app.post("/login", (req, res) => {
  const data = Object.values(req.body);

  postLogin(data).then(
    (value) => {
      if (
        req.body.email == value.email &&
        req.body.password == value.password
      ) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 3600,
            data: value,
          },
          secretKey
        );

        res.cookie("token", token).redirect("/edit");
      }
    },
    (reason) => {
      console.log(reason);
      res.redirect("/login");
    }
  );
});

//
app.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

//middleware /edit
app.use("/edit", (req, res, next) => {
  try {
    req.contender = jwt.verify(req.cookies.token, secretKey).data;
    next();
  } catch (err) {
    console.log(err);
  }
});

// Ruta /edit GET
app.get("/edit", (req, res) => {
  getContender([req.contender.email]).then(
    (value) => {
      res.render("edit", {
        contender: value,
      });
    },
    (reason) => {
      console.log(reason);
    }
  );
});

// Ruta /edit PUT
app.put("/edit", upload.none(), (req, res) => {
  const data = Object.values(req.body);
  data.splice(2, 1);

  putContender(data).then(
    (value) => {
      // res.redirect('/')
      res.sendStatus(200);
    },
    (reason) => {
      console.log(reason);
    }
  );
});

// Ruta /edit PUT
app.delete("/edit/delete", upload.none(), (req, res) => {
  const data = Object.values(req.body);

  deleteContender(data).then(
    (value) => {
      // res.redirect('/')
      res.sendStatus(200);
    },
    (reason) => {
      console.log(reason);
    }
  );
});

app.use("/admin", admin);

//Iniciar Servidor
app.listen(port, () => {
  console.log(`El servidor está inicializado en el puerto ${port}`);
});
