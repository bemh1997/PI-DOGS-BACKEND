const { Router } = require('express');
const razaRouter = Router();

const getAllRaza = require('../controllers/razaControl/getAllRaza');
const getAPI = require('../controllers/razaControl/getRazaAPI');
const getDB = require('../controllers/razaControl/getRazaDB');
const getRazaById = require('../controllers/razaControl/getRazaById');
const getRazaByName = require('../controllers/razaControl/getRazaByName');
const deleteRaza = require('../controllers/razaControl/deleteRaza');
const updateRaza = require('../controllers/razaControl/updateRaza');
const createRaza = require('../controllers/razaControl/createRaza');

// 📍C POST | /raza
razaRouter.post('/',createRaza);
// 📍R GET | /raza
razaRouter.get('/all',getAllRaza);
// 📍R GET | /raza
razaRouter.get('/api',getAPI);
// 📍R GET | /raza
razaRouter.get('/db',getDB);
// 📍R GET | /raza/:idRaza
razaRouter.get('/search/:id',getRazaById);
// 📍R GET | /raza/nombre?="..."
razaRouter.get('/search/',getRazaByName);
// 📍U PUT | /raza/:idRaza
razaRouter.put('/:id',updateRaza)
// 📍D DELETE | /raza/:idRaza
razaRouter.delete('/:id',deleteRaza);

module.exports = razaRouter;