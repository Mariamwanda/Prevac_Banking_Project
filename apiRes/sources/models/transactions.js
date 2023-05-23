let interets = require('../models/interets');
let clients = require('../models/clients');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction',{
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
            allowNull: false,
            references: {
                model: interets(sequelize, DataTypes), 
                key: 'id'
            }
        },
        expediteur: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: clients(sequelize, DataTypes), 
                key: 'id'
            }
        },
        beneficiaire: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: clients(sequelize, DataTypes), 
                key: 'id'
            }
        },
        statut: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    },
    
    {
        timestamps: true, 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    });
    
}