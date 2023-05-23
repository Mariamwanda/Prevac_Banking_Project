module.exports = (sequelize, DataTypes) => {
    return sequelize.define('configuration',{
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        reference: {
            type: DataTypes.STRING(31), 
            allowNull: false, 
            unique: {msg: 'Cette référence a été déjà attribuée à un autre utilisateur'},
        },
        
        raisonSociale: {
            type: DataTypes.STRING(100), 
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le nom de l'entreprise ne doit pas être vide."},
                notNull: {msg: "Le nom de l'entreprise est une propriété obligatoire."},
                min: {
                    args: [2],
                    msg: `Le nom de l'entreprise doit contenir au moins 2 caractères`
                },
                max: {
                    args: [100],
                    msg: `Le nom de l'entreprise doit contenir au plus 100 caractères`
                }
            }
        },
        accromine: {
            type: DataTypes.STRING(10), 
            allowNull: false,
            validate: {
                notEmpty: {msg: "L'accromine ne doit pas être vide."},
                notNull: {msg: "L'accromine est une propriété réquise."},
                min: {
                    args: [2],
                    msg: `L'accromine  doit contenir au moins 2 caractères`
                },
                max: {
                    args: [10],
                    msg: `L'accromine  doit contenir au plus 10 caractères`
                }
            }
        },
        email1: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: {msg: 'Cet adresse email est déjà utilise'},
            validate: {
                notEmpty: {msg: "L'adresse email ne doit pas être vide."},
                isEmail: {msg: "Utilisez uniquement des adresses email pour la propriété email"},
                notNull: {msg: "L'adresse email est une propriété réquise."}
            }
        },
        email2: {
            type: DataTypes.STRING, 
            allowNull: true,
            unique: {msg: 'Cet adresse email est déjà utilise'}
        },
        telephone1: {
            type: DataTypes.STRING(20), 
            allowNull: false, 
            unique: {msg: 'Cet adresse téléphonique est déjà utilise'},
            validate: {
                notEmpty: {msg: "L'adresse téléphonique ne doit pas être vide."},
                notNull: {msg: "L'adresse téléphonique est une propriété réquise."}
            }
        },
        telephone2: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: {msg: 'Cet adresse téléphonique est déjà utilise'}
        },
        logo1: {
            type: DataTypes.TEXT, 
            allowNull: false,
            validate: {
                notEmpty: {msg: "Le logo est obligatoire."},
            }
        },
        logo2: {
            type: DataTypes.TEXT, 
            allowNull: true
        },
        copyRight: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: {msg: 'Cet adresse email est déjà utilise'},
            validate: {
                notEmpty: {msg: "Le copy Rigth est obligatoire."},
                notNull: {msg: "Le copy Rigth est une propriété réquise."}
            }
        },
        interetContisation: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        interetPret: {
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