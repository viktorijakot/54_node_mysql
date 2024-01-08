const mysql = require("mysql2/promise");
const { dbConfig, jwtSecret } = require("../config");
const jwt = require("jsonwebtoken");

async function getSqlData(sql, argArr = []) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(sql, argArr);
    return [rows, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  } finally {
    connection?.end();
    console.log("after connection  end");
  }
}
// const [postArr, error] = getSqlData();

async function getSqlDataNoTry(sql, argArr = []) {
  let connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(sql, argArr);
  connection?.end();
  return [rows, null];

  console.log("after connection  end");
}

function makeJwtToken(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: "1h" });
}
module.exports = { getSqlData, getSqlDataNoTry, makeJwtToken };
