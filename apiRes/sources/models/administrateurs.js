module.exports = (sequelize, DataTypes) => {
    return sequelize.define('administrateur',{
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
        nom : {
            type: DataTypes.STRING(20), 
            allowNull: false,
            
            validate: {
                notEmpty: {msg: "Le nom ne doit pas être vide."},
                notNull: {msg: "Le nom est une propriété réquise."},
                min: {
                    args: [2],
                    msg: `Le nom doit contenir au moins 2 caractères`
                },
                max: {
                    args: [20],
                    msg: `Le nom doit contenir au plus 20 caractères`
                }
            }
        },
        prenom : {
            type: DataTypes.STRING(50), 
            // allowNull: false,
            // validate: {
            //     notEmpty: {msg: "Le prénom ne doit pas être vide."},
            //     notNull: {msg: "Le prénom est une propriété réquise."},
            //     min: {
            //         args: [2],
            //         msg: `Le prénom doit contenir au moins 2 caractères`
            //     },
            //     max: {
            //         args: [50],
            //         msg: `Le prénom doit contenir au plus 50 caractères`
            //     }
            // }
        },
        email: {
            type: DataTypes.STRING, 
            // allowNull: false, 
            // unique: {msg: 'Cet adresse email est déjà utilise'},
            // validate: {
            //     notEmpty: {msg: "L'adresse email ne doit pas être vide."},
            //     isEmail: {msg: "Utilisez uniquement des adresses email pour la propriété email"},
            //     notNull: {msg: "L'adresse email est une propriété réquise."}
            // }
        },
        telephone: {
            type: DataTypes.STRING(20), 
            // allowNull: false, 
            // unique: {msg: 'Cet adresse téléphonique est déjà utilise'},
            // validate: {
            //     notEmpty: {msg: "L'adresse téléphonique ne doit pas être vide."},
            //     notNull: {msg: "L'adresse téléphonique est une propriété réquise."}
            // }
        },
        password: {
            type: DataTypes.STRING, 
            // allowNull: false,
            // validate: {
            //     notEmpty: {msg: "Le mot de passe ne doit pas être vide."},
            //     notNull: {msg: "Le mot de passe est une propriété réquise."}
            // }
        },
        profile: {
            type: DataTypes.TEXT, 
            // allowNull: true,
            // validate: {
            //     isUrl: {msg: "Utilisez uniquement des url pour les profiles."}
            // }
        },
        statut: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            // validate: {
            //     notNull: {msg: "Le statut est une propriété réquise."},
            //     isInt: {msg: "Utilisez uniquement des nombres entiers nalurels pour la propriété statut."},
            //     min: {
            //         args: [0],
            //         msg: `La valeur minimum que peut prendre la propriété statut est 0`
            //     },
            //     max: {
            //         args: [3],
            //         msg: `La valeur maximum que peut prendre la propriété statut est 3`
            //     }
            // }
        }
    },
    {
        timestamps: true, 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    });
}