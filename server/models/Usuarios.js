module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define("Usuarios",{
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Usuarios.associate = (models) => {
    //     Usuarios.hasMany(models.NombreTabla, {
    //         onDelete: "cascade",
    //     });
    // };

    return Usuarios;
}