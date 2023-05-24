const administrateurs = require('../models/administrateurs');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: { mesg: `Ce nom d'utilisateur est déjà utilisé.`}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: administrateurs(sequelize, DataTypes), 
        key: 'id'
        }
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
}
