const { validationResult } = require('express-validator');
const db = require('../database/models');
const Movie = db.Movie;
const Genre = db.Genre

let moviesController = {

    //tomara de la base de datos todo el listado de pelicuas disponible y lo enviara a una vista
    list: (req, res) => {
        Movie.findAll({})
            .then(function (movies) {
                res.render("movies/listMovie", { movies: movies });
            });
    },

    create: (req, res) => {
        Genre.findAll().then(function (genres) {
            return res.render('movies/createMovie', {
                genres: genres,
            })
        })
    },

    save: async (req, res) => {
        const resultValidation = validationResult(req);

        //lets validate errors in the form and if exist one movie

        if (resultValidation.errors.length > 0) {
            return res.render('movies/createMovie', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            let newMovie = req.body;
            let movieInDb = await Movie.findOne({
                where: {
                    title: newMovie.title
                }
            })
                .catch((error) => console.log(error));

            if (movieInDb) {
                return res.render('movies/createMovie', {
                    errors: {
                        title: { msg: 'Esta pelicula ya fue creada' },
                    },
                    oldData: req.body
                });
            } else (
                Movie.create({
                    title: newMovie.title,
                    releaseData: newMovie.releaseData,
                    rating: newMovie.rating,
                    genreId: newMovie.genre,
                    image: newMovie.image
                })
                    .then(() => {
                        return res.redirect('/movies')
                    })
                    .catch((error) => {
                        return res.send(error);
                    })
            )
        }

    },

    //Se le pedira a la bd que busque por pk la pelicula que queremos. La clave primaria (id) sera sacada de la URL (req.params.id). Puede llegar a tardar asi que tendra un .then de manera asincronica con un function que recibira una pelicula y devolvera con el metodo render una vista de detalle.
    //EN findByPk hay que incluir (include) las relaciones a traves de un objeto literal. Se usan los nombres cuando se definieron las relaciones.
    detail: (req, res) => {
        Movie.findByPk(req.params.id, {
            include: [{ association: "genre" }, { association: "characters" }],
        })
            .then(function (movies) {
                res.render("movies/detailMovie", { movies: movies });
            });
    },

    //El metodo editar sera una funcion. el metodo editar tiene varias complejidades porque por un lado hay que pedir los datos de la pelicula que se esta por editar pero por otro lado hay que pedir todos los generos para que el usuario elija cual es el proximo genero al que quiere modificar. En este tipo de pedidos existiran dos pedidos asincronicos. Por un lado se buscara tener un pedido de la pelicula. asi que dentro del findByPk() ira lo que llega por URL req.params.id. 
    //Primero nombre  mis dos pedidos asincronicos y se usara Promise.all() que recibira un array con los dos pedidos. El then se ejecutara cuando se terminen las dos promesas. El then recibira una funcion con dos cosas: por un lado un array de la pelicula a editar y por otro lado con los generos. el then se resuelse solo cuando se terminen las dos promesas.
    //Finalmente se hara un render de editar pelicula compartiendo las dos variables 
    edit: (req, res) => {
        let pedidoPelicula = Movie.findByPk(req.params.id)
        let pedidoGenero = Genre.findAll()

        Promise.all([pedidoPelicula, pedidoGenero])
            .then(function ([movie, genres]) {
                res.render('movies/editMovie', { movie: movie, genres: genres })
            })
    },


    //El metodo actualizar se parecera bastante al guardado, las diferencias seran que no sera create sino que sera update y mucho muy importante es que tendra un where donde el id sera lo que llegue por URL.
    //Otra modificacion es que cuando se termine esto sera que el redirect ira a /peliculas y se le sumara el id de la pelicula que corresponde 

    update: (req, res) => {
        Movie.update({
            title: req.body.title,
            releaseData: req.body.releaseData,
            rating: req.body.rating,
            imageM: req.body.image
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect("/movies/" + req.params.id)
    },


    //El metodo borrar basicamente tendra de la tabla pelicula el metodo destroy el cual TIENE QUE RECIBIR UN WHERE!!!! DONDE SI LE LLEGUE POR URL EL ID CORRESPONDIENTE
    delete: (req, res) => {
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect('/movies')
    }

}

module.exports = moviesController