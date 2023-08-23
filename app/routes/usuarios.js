const { Router } = require("express");
const { verifyToken } = require("../middleware");
const userController = require("../controllers/user.controller");

const router = Router();

router.get("/api/user/:id", verifyToken, userController.findUserById); //encuentra al usuario por el id

router.post("/usuarios", userController.createUser); //crea un usuario

router.put("/api/user/:id", verifyToken, userController.updateUserById); //actualiza el firstName y/o lastName de un usuario de acuerdo al id

router.delete("/api/user/:id", verifyToken, userController.deleteUserById); // borra un usuario segun id

router.get("/api/user", verifyToken, userController.findAll); // encuentra todos los usuarios y los bootcamps de cada usuario

router.get(
  "/usuarios/:id/bootcamps",
  verifyToken,
  userController.findUserBootcamps
); // encunetra a un usuario y sus bootcamps de acuerdo al id

module.exports = router;
