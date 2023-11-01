const dotenv = require('dotenv');
dotenv.config();
const { URL_API, API_KEY } = process.env;
const axios = require('axios');
const { Temperamento } = require('../../db');
const format = require('../format');

const getAll = async (request, response) => {
  try {
    const { data } = await axios(`${URL_API}?api_key=${API_KEY}`);
    apiData = data.map((temp)=> {return {temperament: temp.temperament}});
    const uniqueTemperaments = new Set();

    // Iterar sobre los objetos y dividir los temperamentos.
    apiData.forEach(obj => {
      if (obj.temperament) {
        const temperamentValues = obj.temperament.split(', ');

        // Agregar cada temperamento al conjunto.
        temperamentValues.forEach(temperament => {
          uniqueTemperaments.add(temperament.trim());
        });
      }
    });
    // Convertir el conjunto en un arreglo (si es necesario).
    const allTemperaments = Array.from(uniqueTemperaments);

    for (const temperament of allTemperaments) {
      await Temperamento.findOrCreate({ where: { nombre: temperament } });
    }
  
    var db = await Temperamento.findAll({
      order: [['nombre', 'ASC']],
    });

    return response.status(200).json(db);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor '+ error.message });
  }
};

module.exports = getAll;