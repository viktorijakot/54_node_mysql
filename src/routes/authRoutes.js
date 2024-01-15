const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/api/auth/login", authController.login);
//registracijos dalis

authRouter.post("/api/auth/register", authController.register);
//naujas front endas su VIte
module.exports = authRouter;
