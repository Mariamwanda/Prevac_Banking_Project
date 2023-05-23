module.exports = (sequelize, DataTypes) => {
    return sequelize.define('taux_interet',{
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

