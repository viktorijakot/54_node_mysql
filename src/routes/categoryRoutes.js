const express = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.get("/api/categories", categoryController.getAll);

module.exports = categoryRouter;
