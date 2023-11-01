const { Dog, Temperamento } = require('../../db');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { URL_SEARCH, API_KEY } = process.env;
const format = require('../format');
const { Op } = require('sequelize');

const getRazaByName = async (request, response) => {
  try {
    const { nombre } = request.query;

    if (!nombre) {
      return response.status(400).json({ error: 'Debes proporcionar el nombre de la raza.' });
    }

    var formatedName = format(nombre);
    const { data } = await axios(`${URL_SEARCH}q=${formatedName}&api_key=${API_KEY}`);
    var apiDogsInfo = data;
    const dogsOnMyDB = await Dog.findAll({
      where: {
        nombre: {
          [Op.like]: `%${formatedName}%`,
        },
      },
    });

    const dbDogNamesSet = new Set(dogsOnMyDB.map((dbDog) => format(dbDog.nombre)));

    const dbSearch = [];
    if (dogsOnMyDB) {
      for (const dog of dogsOnMyDB) {
        const temperamentos = await dog.getTemperamentos();
        const tempNames = temperamentos.map((temp) => temp.nombre);
        dbSearch.push({ ...dog.toJSON(), temperamentos: tempNames });
      }
    }

    const apiDogsNotInDb = apiDogsInfo.filter((apiDog) => {
      const apiDogName = format(apiDog.name);
      return !dbDogNamesSet.has(apiDogName);
    });

    for (const dogInfo of apiDogsNotInDb) {
      const dogApiInfo = {
        id: dogInfo.id,
        nombre: format(dogInfo.name),
        imagen: `https://cdn2.thedogapi.com/images/${dogInfo.reference_image_id}.jpg`,
        altura: dogInfo.height.metric,
        peso: dogInfo.weight.metric,
        esperanza: dogInfo.life_span,
        temperamentos: dogInfo.temperament ? dogInfo.temperament.split(', ') : [],
        creadoEnDB: false,
      }
      dbSearch.push(dogApiInfo);
    }

    return response.status(200).json(dbSearch);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor ' + error.message });
  }
};

module.exports = getRazaByName;
