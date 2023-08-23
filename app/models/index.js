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
try {
  db.sync();
} catch (error) {
  console.error("Error al soncronizar, db.sync(), con la base de datos");
}

module.exports = { Bootcamp, Usuario };
