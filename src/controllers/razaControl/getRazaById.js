const dotenv = require('dotenv');
dotenv.config();
const { URL_API, API_KEY } = process.env;
const axios = require('axios');
const { Dog, Temperamento } = require('../../db');
const { validate: isUuid } = require('uuid');
const format = require('../format');

const getRazaById = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ error: 'Debes proporcionar el ID de alguna raza.' });
    }

    let dogFinded;

    if (isUuid(id)) {
      // Si es un UUID, busca en la base de datos por UUID
      dogFinded = await Dog.findOne({ where: { id } });
    }

    if (!dogFinded) {
      // Si no se encontró en la base de datos, busca en la API
      const { data } = await axios(`${URL_API}${id}?api_key=${API_KEY}`);
      const dogApiInfo = {
          id: data.id,
          nombre: format(data.name),
          imagen: "https://cdn2.thedogapi.com/images/"+data.reference_image_id+".jpg",
          altura: data.height.metric,
          peso: data.weight.metric,
          esperanza: data.life_span,
          temperamentos: data.temperament ? data.temperament.split(', ') : [],
          creadoEnDB: false,
      }

      if (!dogApiInfo)
        return response.status(404).json({ error: 'No se encontró la raza en el servidor ni en la API.' });
      else 
        return response.status(200).json({...dogApiInfo});
    }else{
      // Obtener los géneros del objeto videogame a través de las relaciones
      const temperamentos = await dogFinded.getTemperamentos();
      const tempNames = temperamentos.map((temp) => temp.nombre);
      return response.status(200).json({ ...dogFinded.toJSON(), temperamentos: tempNames });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ error: 'Hubo un error en el servidor ' + error.message });
  }
};

module.exports = getRazaById;