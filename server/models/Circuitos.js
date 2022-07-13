module.exports = (sequelize, DataTypes) => {
    const Circuitos = sequelize.define("Circuitos",{
        Circuito: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });
    return Circuitos;
}