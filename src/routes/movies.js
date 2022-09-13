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
router.get('/:id', moviesController.detail);

//edit and update
router.get('/edit/:id', moviesController.edit)
router.post('/edit/:id', moviesController.update)

//Delete
router.post('/delete/:id', moviesController.delete)




module.exports = router;

