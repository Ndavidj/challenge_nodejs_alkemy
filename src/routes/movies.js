const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController')

//Start CRUD

//List
router.get('/', moviesController.list);

//Create 
router.get('/create', moviesController.create);
router.post('/create', moviesController.save);

//Detalle. Ruta por GET que va a llegar un id.
router.get('/:id', moviesController.detail)




module.exports = router;

