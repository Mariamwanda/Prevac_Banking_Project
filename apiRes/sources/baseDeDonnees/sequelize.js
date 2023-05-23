let { Sequelize, DataTypes } = require('sequelize')
let administrateursModels = require('../models/administrateurs');
let clientsModels = require('../models/clients');
let engagementsModels = require('../models/engagements');
let configurationsModels = require('../models/configurations');
let soldesModels = require("../models/soldes");
let comptePretsModels = require("../models/comptePrets");
let cotisationsModels = require('../models/cotisations');
let retraitsModels = require('../models/retraits');
let messageriesModels = require('../models/messageries');
let interetsModels = require('../models/interets');
let transactionsModels = require('../models/transactions');

let bcrypt = require("bcrypt");

let myAdministrateurs = require('./myAdministrateurs');
let myClients = require('./myClients');
let myEngagements = require('./myEngagements');
let myConfigurations = require('./myConfigurations');
let mySoldes = require('./mySoldes');
let myInterets = require('./myInterets');
let myComptesPrets = require('./myComptePrets');
let myMessageries = require('./myMessageries');
let myTransactions = require('./myTransactions');
  
let sequelize = new Sequelize(
    // 'sql8619055',
    // 'sql8619055',
    // '1ygfjF7DIw',
    'ibank_signe',
    'root',
    '',
    {
        host: 'localhost',
        // host: 'sql8.freesqldatabase.com',
        // port: 3306,
        dialect:  'mariadb',
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)

// Générer code aléatoire
let caract = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function genererChaineAleatoire(caracteres, longueur){
    let longueurMax = caracteres.length;
    let chaineAleatoire = '';
    for (let i = 0; i < longueur; i++){
        chaineAleatoire += caracteres[Math.floor(Math.random()*longueurMax)];
    }
    return chaineAleatoire;
}
  
let Admin = administrateursModels(sequelize, DataTypes);
let Client = clientsModels(sequelize, DataTypes);
let Engagement = engagementsModels(sequelize, DataTypes);
let Solde = soldesModels(sequelize, DataTypes);
let Configuration = configurationsModels(sequelize, DataTypes);


let ComptePret = comptePretsModels(sequelize, DataTypes);
let Cotisation = cotisationsModels(sequelize, DataTypes);
let Retrait = retraitsModels(sequelize, DataTypes);
let Messagerie = messageriesModels(sequelize, DataTypes);
let Transaction = transactionsModels(sequelize, DataTypes);



  
let initBaseDeDonnees = async () => {
  const _ = await sequelize.sync({ force: true });
    console.log("La base de données <ibank_signe> a bien été synchronisée.");
    myAdministrateurs.map(admins => {
        bcrypt.hash(admins.password, 10)
        .then(hash => {
            Admin.create({
                reference: `IBANK-${genererChaineAleatoire(caract, 25).toUpperCase()}`,
                nom: admins.nom,
                prenom: admins.prenom,
                email: admins.email,
                telephone: `+225 ${genererChaineAleatoire('0123456789', 10).toUpperCase()}`,
                password: hash,
                profile: admins.url,
                statut: 1,
            }).then(adm => console.log(adm.toJSON()));
        }) 
    });


    myClients.map(client => {
        bcrypt.hash(client.password, 10)
        .then(hash => {
             Client.create({
                reference: `IBANK-${genererChaineAleatoire(caract, 25).toUpperCase()}`,
                nom: client.nom,
                prenom: client.prenom,
                email: client.email,
                telephone: `+225 ${genererChaineAleatoire('0123456789', 10).toUpperCase()}`,
                password: hash,
                profile: client.url,
                statut: 1,
            }).then(clien => console.log(clien.toJSON()))
        })
    })

    myConfigurations.map(config => {
        Configuration.create({
            reference: `IBANK-${genererChaineAleatoire(caract, 25).toUpperCase()}`,
            raisonSociale: config.raisonSociale,
            accromine: config.accromine,
            email1: config.email1,
            email2: config.email2,
            telephone1: config.telephone1,
            telephone2: config.telephone2,
            logo1: config.logo1,
            logo2: config.logo2,
            copyRight: config.copyRight,
            interetContisation: config.interetContisation,
            interetPret: config.interetPret
        }).then(conf => console.log(conf.toJSON()));
    })

    // myEngagements.map(engag => {
    //     Engagement.create({
    //         reference: `IBANK-${genererChaineAleatoire(caract, 25).toUpperCase()}`,
    //         periode: Number(engag.periode),
    //         montant: Number(engag.montant),
    //         moyenPaiement: engag.moyenPaiement,
    //         comptePaiement: engag.comptePaiement,
    //         id_client: Number(engag.id_client),
    //         statut: 1
    //     }).then(eng => console.log(eng.toJSON()));
    // });
}
let all = [];


const aaa = [async function fetchAdmin(){
    const response = await fetch('http://localhost:3000/api/admins');
    const cle = await response.json();
    all = cle.data;
    return MyResult(cle.data);
}]

let MyResult = async  (resultat)=>{ 
    return await resultat; 
}
const MyResul =  MyResult(all)
aaa[0]




// const inter = setTimeout(()=>{
//     module.exports =  { 
//         initBaseDeDonnees, Admin, Client, Configuration, Solde, ComptePret, Cotisation, Retrait, Engagement, fetchAdmin
//     }
// }, 4000)
module.exports =  { 
  initBaseDeDonnees, Admin, Client, Configuration, Solde, ComptePret, Cotisation, Retrait, Engagement, aaa
}
