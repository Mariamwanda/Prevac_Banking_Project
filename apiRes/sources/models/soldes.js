const clients = require('../models/clients');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('solde',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reference: {
            type: DataTypes.STRING(31),
            allowNull: false,
            unique: true
        },
        montant: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        
        statut: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Set FK relationship (hasMany) with `Trainer`
        
        id_client: {
            type: DataTypes.INTEGER,
            allowNull: false
            // references: {
            //     model: clients(sequelize, DataTypes), 
            //     key: 'id'
            // }
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
}