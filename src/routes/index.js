const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();
router.use(express.json());
// Configurar los routers
const razaRoute = require('./raza');
const tempRouter = require('./temp');
// Ejemplo: router.use('/auth', authRouter);
router.use('/raza',razaRoute);
router.use('/temp',tempRouter);

module.exports = router;



