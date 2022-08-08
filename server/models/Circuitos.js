module.exports = (sequelize, DataTypes) => {
    const Circuitos = sequelize.define("Circuitos",{
        circuito: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });

    Circuitos.associate = (models) => {
        Circuitos.hasMany(models.Barrios)
    }

    return Circuitos;
}