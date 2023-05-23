let clients = require('../models/clients');
let retraits = require('../models/retraits');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('interet',{
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
        
        taux: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        unite: {
            type: DataTypes.STRING(30), 
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(30), 
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
        },

        // Set FK relationship (hasMany) with `Trainer`
        id_retrait: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: retraits(sequelize, DataTypes), 
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