const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('name')
		.notEmpty().withMessage('Tienes que escribir un nombre').bail()
		.isAlpha().withMessage('El nombre solo puede contener letras').bail()
		.isLength(2).withMessage('El nombre debe tener al menos 2 caracteres'),

	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),


	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.isLength(8).withMessage('La contraseña debe tener al menos 8 caracteres').bail(),

]