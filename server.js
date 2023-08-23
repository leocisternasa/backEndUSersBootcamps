const express = require("express");
const { Usuario, Bootcamp } = require("./app/models/index");
const routerUsuarios = require("./app/routes/usuarios");
const routerBootcamps = require("./app/routes/bootcamps");
const routerAuth = require("./app/routes/auth");
const routerIndex = require("./app/routes/index");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = 3000;
//configuracion de handlebars

const handlebars = exphbs.create({
  layoutsDir: path.join(__dirname, "app/views"),
  partialsDir: path.join(__dirname, "app/views/partials"),
});
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app/views"));

app.use(logger("dev"));

// se configuran estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "node_modules/axios/dist")));
app.use(express.static(path.join(__dirname, "node_modules/toastr/build")));
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist")));

// Se configura manejo de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// acá nos traemos las rutas
app.use(routerUsuarios);
app.use(routerBootcamps);
app.use(routerAuth);
app.use(routerIndex);
// app.use(routerTransferencias);

app.listen(PORT, () => console.log("Servidor ejecutando en el puerto" + PORT));
