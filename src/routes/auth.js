const express = require('express');
const router = express.Router();

const usersController = require ("../controllers/usersController");

// Middlewares
const uploadFile = require('../middlewares/users/multerMiddleware');
const validations = require('../middlewares/users/validateRegisterMiddleware');
const validateLogin = require('../middlewares/users/validateLoginMiddleware')
const guestMiddleware = require('../middlewares/users/guestMiddleware');
const authMiddleware = require('../middlewares/users/authMiddleware');

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validateLogin, usersController.loginProcess);

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);


// Logout
router.get('/logout', usersController.logout);



module.exports = router;
