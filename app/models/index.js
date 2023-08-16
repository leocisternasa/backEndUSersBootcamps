const db = require("../config/db.config");
const { Usuario } = require("../models/user.model");
const { Bootcamp } = require("../models/bootcamp.model");

//crear las relaciones

Bootcamp.belongsToMany(Usuario, { through: "UsuarioBootcamp", as: "usuarios" });
Usuario.belongsToMany(Bootcamp, {
  through: "UsuarioBootcamp",
  as: "bootcamps",
});

//sincronizo base de datos

db.sync();

module.exports = { Bootcamp, Usuario };
