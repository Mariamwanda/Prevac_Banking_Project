let { Client } = require('../../baseDeDonnees/sequelize')
let { ValidationError, UniqueConstraintError } = require('sequelize');
let auth = require('../../auth/auth');

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
  app.post('/api/clients', auth, (request, response) => {
    request.body.reference = `IBANK-${genererChaineAleatoire(caract, 25).toUpperCase()}`;
    request.body.statut = 1;
    Client.create(request.body)
      .then(client => {
          let message = `Le client ${request.body.nom} ${request.body.prenom} a bien été crée.`;
          response.json({ message, data: client });
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return response.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError){
          return response.status(400).json({message: error.message, data: error})
        }
        let message = `Le client n'a pas pu être ajouter. Veuillez donc réessayer dans quelques instants.`;
        response.status(500).json({message, data: error});
      });
  });
}