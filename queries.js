//req
require("dotenv").config("/");
const { Client, Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : undefined
);

//generarquery
const generarQuery = (name, text, values) => {
  return {
    name,
    text,
    values,
  };
};

const getContenders = () => {
  const name = "getContenders";
  const text = "SELECT * FROM contenders";
  const values = [];
  return pool.query(generarQuery(name, text, values)).then((res) => res.rows);
};

// const demo = () => {
//   getContender()
//     .then(arr => res.json(arr))
//     .catch(error => {
//       res.status(500).send();
//       console.log(error);
//     })
// }

const postContender = (data) => {
  const name = "postContender";
  const text =
    "INSERT INTO contenders (email, nombre, password, anos_experiencia, especialidad, foto, estado) values ($1, $2, $3, $4, $5, $6, $7)";
  const values = data;
  return pool.query(generarQuery(name, text, values));
};

const postLogin = (data) => {
  const name = "postLogin";
  const text = "SELECT * FROM contenders WHERE email=$1 and password=$2";
  const values = data;
  return pool
    .query(generarQuery(name, text, values))
    .then((res) => res.rows[0]);
};

const getContender = (data) => {
  const name = "getContender";
  const text = "SELECT * FROM contenders WHERE email=$1";
  const values = data;
  return pool
    .query(generarQuery(name, text, values))
    .then((res) => res.rows[0]);
};

const putContender = (data) => {
  const name = "putContender";
  const text =
    "UPDATE contenders SET nombre=$2, password=$3, anos_experiencia=$4, especialidad=$5 WHERE email=$1";
  const values = data;
  return pool.query(generarQuery(name, text, values));
};

const deleteContender = (data) => {
  const name = "deleteContender";
  const text = "DELETE FROM contenders WHERE email=$1";
  const values = data;
  return pool.query(generarQuery(name, text, values));
};

const putStatus = (data) => {
  const name = "putStatus";
  const text = "UPDATE contenders SET estado=$2 WHERE id=$1";
  const values = data;
  return pool.query(generarQuery(name, text, values));
};

module.exports = {
  getContenders,
  postContender,
  postLogin,
  getContender,
  putContender,
  deleteContender,
  putStatus,
};
