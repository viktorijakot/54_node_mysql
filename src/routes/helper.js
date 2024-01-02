const mysql = require("mysql2/promise");
const { dbConfig } = require("../config");

async function getSqlData(sql) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(sql);
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

module.exports = { getSqlData };
