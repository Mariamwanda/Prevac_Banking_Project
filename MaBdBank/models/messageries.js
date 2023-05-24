let administrateurs = require('../models/administrateurs');
let clients = require('../models/clients');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('messagerie',{
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
        sujet: {
            type: DataTypes.TEXT, 
            allowNull: false
        },

        contenu: {
            type: DataTypes.TEXT, 
            allowNull: false
        },

        expeditaire: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: administrateurs(sequelize, DataTypes), 
                key: 'id'
            }
        },

        receveur: {
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