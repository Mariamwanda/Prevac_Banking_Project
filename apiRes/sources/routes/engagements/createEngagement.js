let { Engagement } = require('../../baseDeDonnees/sequelize');
let auth = require('../../auth/auth');
let http = require("http");
let { ValidationError, UniqueConstraintError } = require('sequelize');

let caract = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function genererChaineAleatoire(caracteres, longueur){
    let longueurMax = caracteres.length;
    let chaineAleatoire = '';
    for (let i = 0; i < longueur; i++){
        chaineAleatoire += caracteres[Math.floor(Math.random()*longueurMax)];
    }
    return chaineAleatoire;
}


module.exports = (app) => {
  app.post('/api/engagement', (req, res) => {
    req.body.reference = `IBANK-${genererChaineAleatoire(caract, 25).toUpperCase()}`;
    req.body.periode = parseInt(req.body.periode);
    req.body.montant = parseInt(req.body.montant);
    req.body.id_client = parseInt(req.body.id_client);
    req.body.statut = 1;
    Engagement.create(req.body)
      .then(engag => {
          res.redirect('http://localhost:3000/');
          // let message = `L'administrateur ${req.body.nom} ${req.body.prenom} a bien été crée.`;
          // res.json({ message, data: admin });
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message: error.message, data: error})
        }
        let message = `L'administrateur n'a pas pu être ajouter. Veuillez donc réessayer dans quelques instants.`;
        res.status(500).json({message, data: error});
      });
  });
}