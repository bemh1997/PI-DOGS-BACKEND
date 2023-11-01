const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID, // Utiliza DataTypes.UUID para el ID
      primaryKey: true,
      defaultValue: () => uuidv4(), // Genera un UUID automáticamente
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    peso:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    esperanza:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    creadoEnDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    }
  },
  {
    timestamps: false,
  });
};
