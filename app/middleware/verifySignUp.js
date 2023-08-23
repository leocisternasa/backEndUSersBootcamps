const { Usuario } = require("../models");

const verifySignUp = async (req, res, next) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ where: { email: email } });
  if (usuario)
    return res
      .status(400)
      .json({ error: "El correo ya pertenece a un usuario registrado" });
  next();
};

module.exports = { verifySignUp };
