module.exports = function (sequelize, dataTypes) {

    let alias = 'Movie';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        releaseDate:{
            type: dataTypes.DATE
        },

        rating: {
            type: dataTypes.DOUBLE
        },
        image: {
            type: dataTypes.STRING
        },
        genreId: {
            type: dataTypes.INTEGER
        },
        
    }

    let config = {
        tableName: 'movies',
        timestamps: false
    }



    let Movie = sequelize.define(alias, cols, config);

    Movie.associate = function (models) {
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genreId'
        });

        Movie.belongsToMany(models.Actor, {
                as: 'characters',
                through: 'characters_movie',
                foreignKey: 'movieId',
                otherKey: 'actorId',
                timestamps: false
            });
        }

    return Movie
}