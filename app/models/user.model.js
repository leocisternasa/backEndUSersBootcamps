const { DataTypes: dt } = require("sequelize");
const db = require("../config/db.config");

const Usuario = db.define(
  "Usuario",
  {
    firstName: {
      type: dt.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 45],
          msg: "El nombre no puede ser de largo menor a 2",
        },
      },
    },
    lastName: {
      type: dt.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 45],
          msg: "El nombre no puede ser de largo menor a 2",
        },
      },
    },
    email: {
      type: dt.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: {
          args: [2, 45],
          msg: "El email no puede ser de largo menor a 2",
        },
      },
    },
    password: {
      type: dt.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = {
  Usuario,
};
