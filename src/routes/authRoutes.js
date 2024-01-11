const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const { dbConfig, jwtSecret } = require("../config");
const { getSqlData, makeJwtToken } = require("./helper");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/api/auth/login", async (req, res, next) => {
  //pasiimti email,password is req.body
  const { email, password } = req.body;

  //ar yra toks vartotojas su el pastu
  const sql = "SELECT * FROM `users` WHERE `email`=?";
  const [usersArr, error] = await getSqlData(sql, [email]);

  if (error) {
    res.status(500).json("server error");
    return;
  }
  //neradom - pranesam kad email not found 400
  if (usersArr.length === 0) {
    res.status(400).json("Email was not found");
    return;
  }
  //radom- palyginti ar surasto objekto slaptazodziai sutampa
  const foundUser = usersArr[0];
  //plain password - password, hash pass - froundUser.paswword
  if (!bcrypt.compareSync(password, foundUser.password)) {
    // jei nesutampa - 'email or password do not match' 400
    next({ message: "email or password do not match", status: 400 });
    // res.status(400).json("email or password do not match");
    return;
  } else {
    //sugeneruoti token
    const payload = { email: email, sub: foundUser.id };
    const token = makeJwtToken(payload);

    // const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    // jei sutampa - 200, successfull login
    res.status(200).json({ msg: "Successfull login", token });
  }
});
//registracijos dalis

authRouter.post("/api/auth/register", async (req, res, next) => {
  const { email, password } = req.body;
  //slaptazodzio uzkodavimas
  const hashPassword = bcrypt.hashSync(password, 10);
  const sql = `
    INSERT INTO users (email, password)
    VALUES (?, ?)
    `;
  const [usersArr, error] = await getSqlData(sql, [email, hashPassword]);
  if (error) {
    // console.log(error);
    next(error);
    // res.status(500).json("This email already exist");
    return;
  }
  res.status(200).json("new user was created");
});
//naujas front endas su VIte
module.exports = authRouter;
