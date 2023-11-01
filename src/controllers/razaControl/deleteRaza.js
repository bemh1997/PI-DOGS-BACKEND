const { Dog } = require('../../db');
const deletevg = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) return response.status(400).json({ error: 'Falta el ID del perro a eliminar' });

    const genre = await Dog.findByPk(id);

    if (!genre) return response.status(404).json({ error: 'Perro no encontrado' });

    await genre.destroy();

    var db = await Dog.findAll({
      order: [['id', 'ASC']],
    });

    return response.status(200).json(db);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor '+ error.message });
  }
};

module.exports = deletevg;