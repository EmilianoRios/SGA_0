module.exports = (sequelize, DataTypes) => {
    const Administradores = sequelize.define("Administradores", {
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Administradores;
}