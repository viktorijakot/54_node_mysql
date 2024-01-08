const { jwtSecret } = require("./config");
const jwt = require("jsonwebtoken");

function authorizeToken(req, res, next) {
  console.log("authoriz is in progress");
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("no token");
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json("unauthorized");
  }
}

module.exports = {
  authorizeToken,
};
