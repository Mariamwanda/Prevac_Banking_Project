const clients = require('../models/clients');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('retrait',{
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
        
        montant: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        frais: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        statut: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        // Set FK relationship (hasMany) with `Trainer`
        id_destinataire: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: clients(sequelize, DataTypes), 
                key: 'id'
            }
        },
        // Set FK relationship (hasMany) with `Trainer`
        id_beneficiaire: {
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