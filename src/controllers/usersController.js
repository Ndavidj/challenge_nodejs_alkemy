const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const path = require('path')
const fs = require("fs");

// Se requiere el modelo de Users
const db = require('../database/models')
const User = db.User;

const controller = {
  register: (req, res) => {
    return res.render('auth/register');
  },

  // Creación del usuario
  processRegister: async (req, res) => {
    const resultValidation = validationResult(req);

    //Valida si pasan errores de validacion en la creacion del usuario

    if (resultValidation.errors.length > 0) {
      return res.render('auth/register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });

    } else {
      let newUser = req.body;
      // Valida que el email no esté en uso
      let userInDB = await User.findOne({
        where: {
          email: newUser.email
        }
      })
        .catch((error) => console.log(error));

      if (userInDB) {
        return res.render("auth/register", {
          errors: {
            email: { msg: "Este email ya está en uso" },
          },
          oldData: req.body,
        });
      } else {
        User.create({
          name: newUser.firstName,
          email: newUser.email,
          password: bcryptjs.hashSync(newUser.password, 10)
        })
          .then(() => {
            return res.redirect('login');
          })

          .catch((error) => {
            return res.send(error);
          })
      }
    }

  },

  login: (req, res) => {
    return res.render('auth/login');
  },

  loginProcess: async (req, res) => {
    const resultValidation = validationResult(req);

    //Valida si pasan errores de validacion en la creacion del usuario
    if (resultValidation.errors.length > 0) {
      res.render("auth/login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      let userToLogin = await User.findOne({
        where: { email: req.body.email },

      }).catch((error) => console.log(error));


      /* Comparing the password that the user entered with the password that is stored in the database. */
      if (userToLogin) {
        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        console.log(req.body.password)
        console.log(userToLogin.password)
        console.log(isOkThePassword)
        if (isOkThePassword) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;

          if (req.body.rememberUser) {
            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
          }

          return res.redirect('/');
        }

        return res.render('auth/login', {
          errors: {
            email: {
              msg: 'Las credenciales son inválidas'
            }
          }
        });
      }

      return res.render('auth/login', {
        errors: {
          email: {
            msg: 'No se encuentra este email en nuestra base de datos'
          }
        }
      });

    }
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  }
}

module.exports = controller;