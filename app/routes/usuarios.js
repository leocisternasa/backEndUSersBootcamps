const { Router } = require("express");
const userController = require("../controllers/user.controller");

const router = Router();

router.get("/usuarios/:id", userController.findUserById); //encuentra al usuario por el id

router.post("/usuarios", userController.createUser); //crea un usuario

router.put("/usuarios/:id", userController.updateUserById); //actualiza un usuario de acuerdo al id

router.delete("/usuarios/:id", userController.deleteUserById); // borra un usuario

router.get("/usuarios-bootcamps", userController.findAll); // encuentra todos los usuarios y los bootcamps de cada usuario

router.get("/usuarios/:id/bootcamps", userController.findUserBootcamps); // encunetra a un usuario y sus bootcamps de acuerdo al id

module.exports = router;
