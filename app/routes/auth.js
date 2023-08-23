const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/user.model");
const { verifySignUp, llaveSecreta, verifyToken } = require("../middleware");
const bcrypt = require("bcrypt");
const router = Router();

router.post("/api/signup", verifySignUp, async (req, res) => {
  const { firstName, lastName, email, password, passConfirm } = req.body;

  //verificamos que los campos existen

  if (!firstName || !lastName || !email || !password || !passConfirm)
    return res.status(400).json({ error: "Debes ingresar todos los datos" });

  //verifico que la contrasena y el passcomnfirm coincidan
  if (!(password === passConfirm))
    return res
      .status(400)
      .json({ error: "el password y la confirmacion deben coincidir" });

  //ahora creo un usuario con los datos entregados

  let newUser;

  try {
    const passwordEncripted = await bcrypt.hash(password, 10);
    newUser = await Usuario.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordEncripted,
    });

    return res.send("Usuario creado con exito");
  } catch (error) {
    return res.status(400).json(error);
  }
});

// crear un JWT
router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  //Verifico que el usuario existe en la base de datos
  const usuario = await Usuario.findOne({ where: { email: email } });

  if (!usuario) return res.status(404).json({ error: "usuario no registrado" });

  //Verifico que la contrasena sea la correcta
  let passwordCorrecto = await bcrypt.compare(
    password,
    usuario.dataValues.password
  );

  if (!passwordCorrecto)
    return res.status(400).json({ error: "La contraseña es incorrecta" });
  // aqui creo la fecha de expiracion del JWT, en este caso una hora mas
  // const unaHora = Math.floor(new Date() / 1000) + 3600;
  //ahora estoy usando el atributo expiresIn que viene con la libreria jwt para setear la expiracion

  // creo el toquen
  const token = jwt.sign(
    {
      id: usuario.dataValues.id,
      email: email,
    },
    llaveSecreta,
    { expiresIn: "1h" }
  );

  res.json(token);
});

//leer un JWT
router.get("/read", async (req, res) => {
  const { token } = req.header;
  let decoded;

  try {
    decoded = jwt.verify(token, llaveSecreta);
  } catch (error) {
    res.status(400).json(error);
  }
  console.log(decoded);
  res.json(decoded);
});

router.get("/protegida", verifyToken, (req, res) => {
  const data = req.data;
  res.json(data);
});

module.exports = router;
