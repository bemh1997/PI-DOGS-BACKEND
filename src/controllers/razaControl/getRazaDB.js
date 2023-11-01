const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { URL_API, API_KEY } = process.env;
const { Dog, Temperamento } = require('../../db');
const format = require('../format');

const getAll = async (request, response) => {
  try {
    var db = [];
    const MyDB = await Dog.findAll();
    if (MyDB) {
      for (const element of MyDB) {
        const temperamentos = await element.getTemperamentos();
        const tempNames = temperamentos.map((temp) => temp.nombre);
        element.dataValues = { ...element.dataValues, temperamentos: tempNames}; // Usar element.dataValues para actualizar los valores de la instancia
      }
      db = [...MyDB];
    }
    
    return response.status(200).json(db);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor ' + error.message });
  }
};

module.exports = getAll;
