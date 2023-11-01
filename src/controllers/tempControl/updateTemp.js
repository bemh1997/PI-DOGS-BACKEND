const { Temperamento } = require('../../db');
const format = require('../format');

const updateTemp = async (request, response) => {
  try {
    const { id } = request.params;
    const { nombre } = request.body;

    if (!id) return response.status(400).json({ error: 'Falta el ID del temperamento a modificar' });

    const temperamento = await Temperamento.findByPk(id);

    if (!temperamento) return response.status(404).json({ error: 'Temperamento no encontrado' });

    if (nombre) {
      // Verificar si ya existe un temperamento con el mismo nombre.
      const existingTemperamento = await Temperamento.findOne({
        where: { nombre: format(nombre) }
      });

      if (existingTemperamento && existingTemperamento.id !== temperamento.id) {
        return response.status(400).json({ error: 'Ya existe un temperamento con este nombre' });
      }

      temperamento.nombre = format(nombre);
      await temperamento.save();
    }

    return response.status(200).json(temperamento);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor ' + error.message });
  }
};

module.exports = updateTemp;
