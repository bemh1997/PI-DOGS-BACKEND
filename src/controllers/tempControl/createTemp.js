const { Temperamento } = require('../../db');

const format = require('../format');

async function createTemp(request, response){
  try {
    const { nombre } = request.body;

    if (!nombre) return response.status(400).json({ error: 'Falta el nombre del temperamento' });
    var formatedName = format(nombre);
    const [temp, created] = await Temperamento.findOrCreate({
      where: { nombre: formatedName },
    });
    if (created) {
      return response.status(201).json(temp);
    } else {
      return response.status(409).json({ error: 'El temperamento ya existe' });
    }
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor '+error.message });
  }
};

module.exports = createTemp;