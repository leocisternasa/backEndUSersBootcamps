const { Router } = require("express");
const bootcampController = require("../controllers/bootcamp.controller");
const { Bootcamp, Usuario } = require("../models");
const { verifyToken } = require("../middleware");

const router = Router();
// obtiene la informacion de todos los bootcamps pero sin los usuarios participantes
router.get("/api/bootcamp", verifyToken, bootcampController.getAllBootcamps);
// crea un nuevo bootcamp
router.post("/api/bootcamp", bootcampController.createBootcamp);
// actualiza la info del bootcamp de acuerdo al ID
router.put("/bootcamps/:id", bootcampController.updateBootcamp);
// obtiene todos los bootcamps con los usuarios por bootcamp
router.get("/bootcamps-usuarios", bootcampController.findAll);
//Obtiene el bootcamp por su id con los usuarios que participan de ese bootcamp
router.get(
  "/api/bootcamp/:id",
  verifyToken,
  bootcampController.findByIdWithUsers
);
// encuentra un bootcamp por id
router.get("/bootcamps/:id", bootcampController.findById);
// agrega un usuario al bootcamp de acuerdo al id del bootcamp
router.post(
  "/bootcamps/:bootcampId/agregar-usuario",
  bootcampController.addUser
);
// agrega a un usuario logueado al bootcamp de acuerdo a la id del bootcamp
router.post("/api/bootcamp/adduser", verifyToken, bootcampController.adduser);

module.exports = router;
