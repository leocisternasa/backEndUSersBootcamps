const { Bootcamp } = require("../models/bootcamp.model");
const { Usuario } = require("../models/user.model");

const createBootcamp = async (req, res) => {
  const { title, cue, description } = req.body;
  if (!title || !cue || !description)
    return res
      .status(400)
      .send("Deben ir todos los datos: title, cue y description");

  if (description.length < 30)
    res.status(400).json({
      error: "El largo de la descripcion debe ser de minimo 20 caracteres",
    });

  await Bootcamp.create({
    title: title,
    cue: cue,
    description: description,
  });
  res.send("Bootcamp creado con exito");
};

const getAllBootcamps = async (req, res) => {
  const bootcamps = await Bootcamp.findAll();
  if (!bootcamps)
    return res.status(404).json({ error: "Bootcamp no encontrado" });

  res.json(bootcamps);
};

const addUser = async (req, res) => {
  const { bootcampId } = req.params;
  const { userId } = req.body;

  const usuario = await Usuario.findByPk(userId);
  if (!usuario) return res.status(404).json({ error: "usuario no existe" });

  const bootcamp = await Bootcamp.findByPk(bootcampId);
  if (!bootcamp)
    return res.status(404).json({ error: "Bootcamp no encontrado" });
  await bootcamp.addUsuario(usuario);
  res.send("Usuario agregado al Bootcamp correctamente");
};
const findById = async (req, res) => {
  const { id } = req.params;
  const bootcamp = await Bootcamp.findByPk(id);
  if (!bootcamp)
    return res.status(404).json({ error: "No se pudo encontrar el bootcamp" });
  res.json(bootcamp);
};
const findAll = async (req, res) => {
  try {
    const bootcampsConUsuarios = await Bootcamp.findAll({
      include: [
        { model: Usuario, as: "usuarios", through: { attributes: [] } },
      ],
    });

    if (!bootcampsConUsuarios)
      return res.status(404).json({ error: "bootcamps no encontrados" });

    res.json(bootcampsConUsuarios);
  } catch (error) {
    res.send(error.message);
  }
};
const updateBootcamp = async (req, res) => {
  const { id } = req.params;
  const { title, cue, description } = req.body;
  const bootcamp = await Bootcamp.findByPk(id);
  if (!bootcamp)
    return res.status(404).json({ error: "Bootcamp no encontrado" });
  const titleToUpdate = title || bootcamp.dataValues.title;
  const cueToUpdate = cue || bootcamp.dataValues.cue;
  const descriptionToUpdate = description || bootcamp.dataValues.description;

  await Bootcamp.update(
    {
      title: titleToUpdate,
      cue: cueToUpdate,
      description: descriptionToUpdate,
    },
    { where: { id: id } }
  );
  res.send("Bootcamp actualizado con exito");
};

const adduser = async (req, res) => {
  const { id } = req.data;
  const { bootcampId } = req.body;

  const usuario = await Usuario.findByPk(id);
  const bootcamp = await Bootcamp.findByPk(bootcampId);

  try {
    await bootcamp.addUsuario(usuario);
    if (!bootcamp)
      return res.status(404).json({ error: "Bootcamp no encontrado" });
    return res.send("Usuario agregado al bootcamp de forma correcto");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const findByIdWithUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const bootcampConUsuarios = await Bootcamp.findByPk(id, {
      include: [
        { model: Usuario, as: "usuarios", through: { attributes: [] } },
      ],
    });

    if (!bootcampConUsuarios)
      return res.status(404).json({ error: "bootcamps no encontrados" });

    res.json(bootcampConUsuarios);
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = {
  createBootcamp,
  addUser,
  findById,
  findAll,
  updateBootcamp,
  getAllBootcamps,
  adduser,
  findByIdWithUsers,
};
