const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { URL_API, API_KEY } = process.env;
const { Dog, Temperamento } = require('../../db');
const format = require('../format');

const getAll = async (request, response) => {
  try {
    var consult = [];
    var apiDogsInfo;

    if (consult.length < 1) {
      const URL = `${URL_API}?api_key=${API_KEY}`;
      const promise = axios.get(URL);
      const responses = await Promise.all([promise]);
      
      apiDogsInfo = responses.flatMap(response => response.data);

      const dogApiInfo = apiDogsInfo.map((dog) => {
        return {
          id: dog.id,
          nombre: format(dog.name),
          imagen: dog.image.url,
          altura: dog.height.metric,
          peso: dog.weight.metric,
          esperanza: dog.life_span,
          temperamentos: dog.temperament ? dog.temperament.split(', ') : [],
          creadoEnDB: false,
        };
      });

      const dbDogNamesSet = new Set((await Dog.findAll()).map((dbDog) => format(dbDog.nombre)));

      // Filtra los juegos de la API que no estén en la BD por nombre
      const apiDogsNotInDb = dogApiInfo.filter((apiDog) => {
        const apiDogName = format(apiDog.nombre);
        // Comprobar si el nombre del perro de la API no está en el Set de nombres de perros en la base de datos
        return !dbDogNamesSet.has(apiDogName);
      });
      
      consult = [...apiDogsNotInDb];
    }

    const MyDB = await Dog.findAll();
    
    if (MyDB) {
      for (const element of MyDB) {
        const temperamentos = await element.getTemperamentos();
        const tempNames = temperamentos.map((temp) => temp.nombre);
        element.dataValues = { ...element.dataValues, temperamentos: tempNames}; // Usar element.dataValues para actualizar los valores de la instancia
      }
      consult = [...MyDB, ...consult];
    }
    
    return response.status(200).json(consult);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor ' + error.message });
  }
};

module.exports = getAll;
