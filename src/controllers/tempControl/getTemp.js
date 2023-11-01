const { Temperamento } = require('../../db');
const format = require('../format');

const getTemp = async(request, response)=>{
  try {
    const { id, nombre } = request.query;

    if (!id && !nombre) {
      return response.status(400).json({ error: 'Debes proporcionar al menos un parámetro (id o nombre).' });
    }

    let condition = {};

    if (id) {
      condition.id = id;
    }

    if (nombre) {
      condition.nombre = format(nombre);
    }

    const temperamento = await Temperamento.findAll({where: condition});

    if (temperamento.length === 0) {
      return response.status(404).json({ error: 'No se encontró el temperamento con los parámetros proporcionados.' });
    }

    return response.status(200).json(temperamento);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor '+error.message });  
  }
};

module.exports = getTemp;