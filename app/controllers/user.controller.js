const { Usuario } = require("../models/user.model");

// Falta crear el controlador que cambie el password

const createUser = async (req, res) => {
  try {
    const usuario = req.body;

    await Usuario.create({
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      email: usuario.email,
      password: usuario.password,
    });
    console.log("se ha creado el siguiente usuario con exito: ", usuario);
    res.send("Usuario Creado con exito");
  } catch (error) {
    console.log(error.message);
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(400).json({ error: "usuario no encontrado" });
  res.json(usuario);
};

const findAll = async (req, res) => {
  const usuariosConBootcamps = await Usuario.findAll({
    include: [
      { model: Bootcamp, as: "bootcamps", through: { attributes: [] } },
    ],
  });

  if (!usuariosConBootcamps) return res.json({ error: "No hay usuarios" });

  res.json(usuariosConBootcamps);
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    let firstNametoUpdate = firstName || usuario.dataValues.firstName;
    let lastNameToUpdate = lastName || usuario.dataValues.lastName;

    await Usuario.update(
      {
        firstName: firstNametoUpdate,
        lastName: lastNameToUpdate,
      },
      { where: { id: id } }
    );
    res.send("Usuario actualizado con exito");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  await Usuario.destroy({ where: { id: id } });
  res.send("Usuario eliminado con exito");
};

const findUserBootcamps = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  let usuarioSinPassword = {};

  for (let key in usuario.dataValues) {
    if (key !== "password") {
      usuarioSinPassword[key] = usuario[key];
    }
  }

  let bootcampsDelUsuario = await usuario.getBootcamps();
  bootcampsDelUsuario = bootcampsDelUsuario.map(
    (bootcamp) => bootcamp.dataValues
  );
  const usuarioConBootcamps = {
    usuario: usuarioSinPassword,
    bootcamps: bootcampsDelUsuario,
  };

  res.json(usuarioConBootcamps);
};
module.exports = {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
  findUserBootcamps,
};
