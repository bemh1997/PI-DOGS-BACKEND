const { Router } = require('express');
const tempRouter = Router();
const createTemp = require('../controllers/tempControl/createTemp');
const getAllTemps = require('../controllers/tempControl/getAllTemps');
const getTemp = require('../controllers/tempControl/getTemp');
const updateTemp = require('../controllers/tempControl/updateTemp');
const deleteTemp = require('../controllers/tempControl/deleteTemp');

tempRouter.post('/',createTemp);
tempRouter.get('/all',getAllTemps);
tempRouter.get('/',getTemp);
tempRouter.put('/:id',updateTemp);
tempRouter.delete('/:id',deleteTemp);

module.exports = tempRouter;