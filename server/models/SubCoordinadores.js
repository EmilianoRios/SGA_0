module.exports = (sequelize, DataTypes) => {
    const SubCoordinadores = sequelize.define("SubCoordinadores", {
        alias: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        telefono_principal: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
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
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        item: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    SubCoordinadores.associate = (models) => {
        SubCoordinadores.hasMany(models.Delegados)
    }

    return SubCoordinadores;
}