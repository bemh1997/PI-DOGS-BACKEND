const { throws } = require('assert');
const { Dog, Temperamento } = require('../../db');
const format = require('../format');
const validaName = require('../validationName');

async function createRaza(request, response) {
  try {
    const {
      imagen,
      nombre,
      alturaMin,
      alturaMax,
      pesoMin,
      pesoMax,
      esperanzaMin,
      esperanzaMax,
      temperamentos
    } = request.body;

    if (!nombre) return response.status(400).json({ error: 'Falta el nombre de la raza' });
    if (!alturaMin) return response.status(400).json({ error: 'Falta la altura mínima' });
    if (!alturaMax) return response.status(400).json({ error: 'Falta la altura máxima' });
    if (!pesoMin) return response.status(400).json({ error: 'Falta el peso mínimo' });
    if (!pesoMax) return response.status(400).json({ error: 'Falta el peso máximo' });
    if (!esperanzaMin) return response.status(400).json({ error: 'Falta la esperanza de vida mínima' });
    if (!esperanzaMax) return response.status(400).json({ error: 'Falta la esperanza de vida máxima' });
    
    //Validar que el nombre no tenga caracteres especiales.
    if(validaName(nombre)){
      var formatedName = format(nombre);
    }else  
      throw new Error("No indiques caracteres especiales.");

    // Validar que alturaMin sea menor que alturaMax
    if (alturaMin >= alturaMax) {
      return response.status(400).json({ error: 'La altura mínima debe ser menor que la altura máxima' });
    }

    // Validar que pesoMin sea menor que pesoMax
    if (pesoMin >= pesoMax) {
      return response.status(400).json({ error: 'El peso mínimo debe ser menor que el peso máximo' });
    }

    // Validar que esperanzaMin sea menor que esperanzaMax
    if (esperanzaMin >= esperanzaMax) {
      return response.status(400).json({ error: 'La esperanza de vida mínima debe ser menor que la esperanza de vida máxima' });
    }

    
    // Busca la raza de perro por nombre
    const existeRaza = await Dog.findOne({
      where: {
        nombre: formatedName,
      },
    });

    if (existeRaza) {
      return response.status(409).json({ error: 'La raza de perro ya existe en la base de datos' });
    }

    // Crea el perro si no existe
    const altura = `${alturaMin} - ${alturaMax}`;
    const peso = `${pesoMin} - ${pesoMax}`;
    const esperanza = `${esperanzaMin} - ${esperanzaMax} years`;

    const newDog = await Dog.create({
      imagen,
      nombre: formatedName,
      altura,
      peso,
      esperanza,
      creadoEnDB: true,
    });

    const allInfoDog = {
      id: newDog.id,
      imagen,
      nombre: formatedName,
      altura,
      peso,
      esperanza,
      temperamentos
    }

    for (const TemperamentoName of temperamentos) {
      let temperamento = await Temperamento.findOne({ where: { nombre: TemperamentoName } });
    
      if (!temperamento) {
        temperamento = await Temperamento.create({ nombre: TemperamentoName });
      }
    
      await newDog.addTemperamento(temperamento);
    }

    return response.status(201).json(allInfoDog);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor ' + error.message });
  }
}

module.exports = createRaza;
