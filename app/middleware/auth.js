const jwt = require("jsonwebtoken");

const llaveSecreta = "llavesecreta";

function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  //verificamos que el token se pueda decodificar

  let decoded;

  try {
    decoded = jwt.verify(authorization, llaveSecreta);
  } catch (error) {
    console.log("error en la decodificacion", error);
    return res.status(400).json(error);
  }

  // verificamos que no este expirado
  const now = new Date() / 1000;
  if (now > decoded.exp)
    return res.status(401).json({ error: "tu token a expiro" });

  //guardamos el usuario en el objeto request
  req.data = decoded;

  // si todo esta ok, avanzamos al camino tradicional

  next();
}

module.exports = { verifyToken, llaveSecreta };
