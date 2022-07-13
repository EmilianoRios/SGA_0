module.exports = (sequelize, DataTypes) => {
    const SubCoordinadores = sequelize.define("SubCoordinadores",{
        alias_subcoordinador: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_coordinador: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        documento_dni: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        telefono_principal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            unique: true
        },
        domicilio: {
            type: DataTypes.STRING,
        },
        barrio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        circuito: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        localidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        provincia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_ingreso: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        item: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imagen_perfil: {
            type: DataTypes.STRING,
        }
    });
    return SubCoordinadores;
}