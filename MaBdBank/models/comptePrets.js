const clients = require('../models/clients');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('compte_pret',{
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        reference: {
            type: DataTypes.STRING(20), 
            allowNull: false, 
            unique: true
        },
        
        pourcentage: {
            type: DataTypes.INTEGER, 
            allowNull: false
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
            allowNull: false,
            references: {
                model: clients(sequelize, DataTypes), 
                key: 'id'
            }
        }
    },
    
    {
        timestamps: true, 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    });
}