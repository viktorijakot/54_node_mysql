const { jwtSecret } = require("./config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Yup = require("yup");

function authorizeToken(req, res, next) {
  console.log("authoriz is in progress");
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("no token");
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
    req.userEmail = decoded.email;
    req.userId = decoded.sub;
    console.log("req.userEmail ===", req.userEmail);
    console.log("req.userId ===", req.userId);
    next();
  } catch (error) {
    res.status(401).json("unauthorized");
  }
}

async function validatePostBody(req, res, next) {
  const { title, author, date, content, cat_id: catId } = req.body;
  const postScheme = Yup.object({
    title: Yup.string().trim().min(3).required("Privalomas laukas"),
    author: Yup.string().trim().min(3).required(),
    content: Yup.string().trim().min(5, "Prasom placiau").required(),
    date: Yup.date().required("you have to choose date"),
    cat_id: Yup.number()
      .integer()
      .min(1, "You have to choose category")
      .required("You have to choose category"),
  });
  try {
    const user = await postScheme.validate(req.body, { abortEarly: false });
    console.log("user ==", user);
    next();
  } catch (error) {
    console.log("error===", error);
    const errFormater = {};
    const formatedErrors = error.inner.forEach((errObj) => {
      errFormater[errObj.path] = errObj.message;
      if (errObj.path === "date") {
        errFormater[errObj.path] = "date is invalid";
      } else if (errObj.path === "cat_id") {
        errFormater[errObj.path] = "you have to choose category";
      }
    });
    res.status(400).json(errFormater);
  }
}
module.exports = {
  authorizeToken,
  validatePostBody,
};
