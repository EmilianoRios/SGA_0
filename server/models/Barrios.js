module.exports = (sequelize, DataTypes) => {
    const Barrios = sequelize.define("Barrios",{
        barrio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        circuito: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Barrios;
}