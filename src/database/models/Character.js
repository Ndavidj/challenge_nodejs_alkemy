module.exports = function (sequelize, dataTypes) {

    let alias = 'Character';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        age: {
            type: dataTypes.INTEGER
        },
        weight: {
            type: dataTypes.INTEGER
        },
        history: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'characters',
        timestamps: false
    }



    let Character = sequelize.define(alias, cols, config);

    Character.associate = function (models) {
        Character.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'character_movie',
            foreignKey: 'characterId',
            otherKey: 'movieId',
            timestamps: false
        });
    }

    return Character
}