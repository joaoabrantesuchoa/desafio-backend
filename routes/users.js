const express = require("express");
const route = express.Router();

const userController = require("../controllers/userController");

route.get("/", userController.getAll);
route.get("/index", userController.getUser);
route.put("/update", userController.update);
route.post("/create", userController.create);
route.delete("/delete", userController.delete);

module.exports = route;
