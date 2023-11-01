const { Dog, Temperamento} = require('../../db');
const format = require('../format');

const updatevg = async (request, response) => {
  try {
    const { id } = request.params;
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

    if (!id) return response.status(400).json({ error: 'Falta el ID del perro a modificar' });

    var dog = await Dog.findByPk(id);

    if (!dog) return response.status(404).json({ error: 'Perro no encontrado' });

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
    
    if(imagen) dog.imagen = imagen;
    if(nombre) dog.nombre = format(nombre);
    if(alturaMin && alturaMax) dog.altura = alturaMin+" - "+alturaMax;
    if(pesoMin && pesoMax) dog.peso = pesoMin +" - " +pesoMax;
    if(esperanzaMin && esperanzaMax) dog.esperanza = esperanzaMin +" - "+esperanzaMax +" years";
    if(temperamentos) {
      for (const TemperamentoName of temperamentos) {
        let temperamento = await Temperamento.findOne({ where: { nombre: TemperamentoName } });
      
        if (!temperamento) {
          temperamento = await Temperamento.create({ nombre: TemperamentoName });
        }
      
        await dog.addTemperamento(temperamento);
      }
    }

    if(alturaMin && !alturaMax){
      let arrayAltura = dog.altura.split(' ');
      let alturaMax = arrayAltura[2];
      if (alturaMin >= alturaMax) {
        return response.status(400).json({ error: 'La altura mínima debe ser menor que la altura máxima' });
      }
      dog.altura = alturaMin+' - '+alturaMax;
    }else if(!alturaMin && alturaMax){
      let arrayAltura = dog.altura.split(' ');
      let alturaMin = arrayAltura[0];
      if (alturaMax <= alturaMin) {
        return response.status(400).json({ error: 'La altura máxima debe ser mayor que la altura mínima' });
      }
      dog.altura = alturaMin+' - '+alturaMax+' years';
    }

    if(pesoMin && !pesoMax){
      let arrayPeso = dog.peso.split(' ');
      let pesoMax = arrayPeso[2];
      if (pesoMin >= pesoMax) {
        return response.status(400).json({ error: 'El peso mínimo debe ser menor que el peso máximo' });
      }
      dog.peso = pesoMin+' - '+pesoMax;
    }else if(!pesoMin && pesoMax){
      let arrayPeso = dog.peso.split(' ');
      let pesoMin = arrayPeso[0];
      if (pesoMax <= pesoMin) {
        return response.status(400).json({ error: 'La peso máximo debe ser mayor que el peso mínimo' });
      }
      dog.peso = pesoMin+' - '+pesoMax;
    }

    if(esperanzaMin && !esperanzaMax){
      let arrayEsperanza = dog.esperanza.split(' ');
      let esperanzaMax = arrayEsperanza[2];
      if (esperanzaMin >= esperanzaMax) {
        return response.status(400).json({ error: 'La esperanza mínima debe ser menor que la esperanza máxima' });
      }
      dog.esperanza = esperanzaMin+' - '+esperanzaMax+' years';
    }else if(!esperanzaMin && esperanzaMax){
      let arrayEsperanza = dog.esperanza.split(' ');
      let esperanzaMin = arrayEsperanza[0];
      if (esperanzaMax <= esperanzaMin) {
        return response.status(400).json({ error: 'La esperanza máxima debe ser mayor que la esperanza mínima' });
      }
      dog.esperanza = esperanzaMin+' - '+esperanzaMax+' years';
    }

    await dog.save();
    return response.status(200).json(dog);
  } catch (error) {
    return response.status(500).json({ error: 'Hubo un error en el servidor ' + error.message});
  }
};

module.exports = updatevg;