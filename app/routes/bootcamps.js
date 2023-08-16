const { Router } = require("express");
const bootcamoController = require("../controllers/bootcamp.controller");
const { Bootcamp, Usuario } = require("../models");

const router = Router();

router.get("/bootcamps", bootcamoController.getAllBootcamps); // obtiene la informacion de todos los bootcamps pero sin los usuarios participantes

router.post("/bootcamps", bootcamoController.createBootcamp); // cra un nuevo bootcamp

router.put("/bootcamps/:id", bootcamoController.updateBootcamp); // actualiza la info del bootcamp de acuerdo al ID
router.get("/bootcamps-usuarios", bootcamoController.findAll); // obtiene todos los bootcamps con los usuarios por bootcamp

router.get("/bootcamps/:id", bootcamoController.findById); // encuentra un bootcamp por id

router.post(
  "/bootcamps/:bootcampId/agregar-usuario",
  bootcamoController.addUser
); // agrega un usuario al bootcamp de acuerdo al id del bootcamp

module.exports = router;
