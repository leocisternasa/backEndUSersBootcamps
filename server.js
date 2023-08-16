const express = require("express");
const { Usuario, Bootcamp } = require("./app/models/index");
const routerUsuarios = require("./app/routes/usuarios");
const routerBootcamps = require("./app/routes/bootcamps");

const app = express();
const PORT = 3000;

// se configuran estáticos
app.use("/static", express.static("static"));

// Se configura manejo de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// acá nos traemos las rutas
app.use(routerUsuarios);
app.use(routerBootcamps);
// app.use(routerTransferencias);

app.listen(PORT, () => console.log("Servidor ejecutando en el puerto" + PORT));
