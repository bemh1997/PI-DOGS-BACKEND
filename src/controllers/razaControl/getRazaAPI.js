const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { URL_API, API_KEY } = process.env;
const format = require('../format');

const getAll = async (request, response) => {
  try {
      const URL = `${URL_API}?api_key=${API_KEY}`;
      const promise = axios.get(URL);
      const responses = await Promise.all([promise]);
      
      const apiDogsInfo = responses.flatMap(response => response.data);

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
      
      consult = [...dogApiInfo];
    
    return response.status(200).json(consult);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor ' + error.message });
  }
};

module.exports = getAll;
