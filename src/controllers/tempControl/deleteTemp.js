const { Temperamento } = require('../../db');
const deleteTemp = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) return response.status(400).json({ error: 'Falta el ID del temperamento a eliminar' });

    const temperamento = await Temperamento.findByPk(id);

    if (!temperamento) return response.status(404).json({ error: 'Temperamento no encontrado' });

    await temperamento.destroy();

    var db = await Temperamento.findAll({
      order: [['id', 'ASC']],
    });

    return response.status(200).json(db);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor '+ error.message });
  }
};

module.exports = deleteTemp;