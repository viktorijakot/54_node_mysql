const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../config");
const { getSqlData } = require("./helper");

const authRouter = express.Router();

authRouter.post("/api/auth/login", async (req, res) => {
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
    res.status(400).json("email was not found");
    return;
  }
  //radom- palyginti ar surasto objekto slaptazodziai sutampa
  const foundUser = usersArr[0];
  if (foundUser.password !== password) {
    // jei nesutampa - 'email or password do not match' 400
    res.status(400).json("email or password do not match");
    return;
  } else {
    // jei sutampa - 200, successfull login
    res.status(200).json("successfull login");
  }
});
//registracijos dalis

authRouter.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const sql = `
    INSERT INTO users (email, password)
    VALUES (?, ?)
    `;
  const [usersArr, error] = await getSqlData(sql, [email, password]);
  if (error) {
    console.log(error);
    res.status(500).json("This email already exist");
    return;
  }
  res.status(200).json("new user was created");
});
//naujas front endas su VIte
module.exports = authRouter;
