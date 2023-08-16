const { DataTypes: dt } = require("sequelize");
const db = require("../config/db.config");

const Bootcamp = db.define(
  "Bootcamp",
  {
    title: {
      type: dt.STRING,
      allowNull: false,
    },
    cue: {
      type: dt.INTEGER,
      isInt: true,
      allowNull: false,
      validate: {
        len: {
          args: [1, 11],
          msg: "El numero no puede ser de largo menor a 5 ni mayor que 10",
        },
      },
    },
    description: {
      type: dt.STRING,
      isEmail: true,
      allowNull: false,
      validate: {
        len: {
          args: [20, 350],
          msg: "La descripcion puede ser de largo menor a 30 caracteres",
        },
      },
    },
  },
  { timestamps: true }
);

// try {
//   db.sync();
// } catch (err) {
//   console.error(
//     "Something went wrong with the SYNC of the table Transferencia",
//     err
//   );
// }

module.exports = {
  Bootcamp,
};
