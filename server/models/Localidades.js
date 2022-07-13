module.exports = (sequelize, DataTypes) => {
    const Localidades = sequelize.define("Localidades",{
        localidad:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Localidades;
}