// let clients = require('../models/clients');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('engagement',{
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
        periode: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        montant: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        moyen_paiement:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        compte_paiement:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        statut: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
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
    });
}