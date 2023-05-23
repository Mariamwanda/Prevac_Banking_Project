let { Admin } = require('../../baseDeDonnees/sequelize');
let auth = require('../../auth/auth');
// let http = require("http");
let { ValidationError, UniqueConstraintError } = require('sequelize');


function genererChaineAleatoire(){
  const caract = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let longueurMax = caract.length;
    let chaineAleatoire = '';
    for (let i = 0; i < 25; i++){
        chaineAleatoire += caract[Math.floor(Math.random()*longueurMax)];
    }
    return chaineAleatoire;
}

module.exports = (app) => {
  app.post('/api/admins', /*auth,*/ (request, response) => {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++',request.params)
    request.body.reference = `IBANK-${genererChaineAleatoire().toUpperCase()}`;
    request.body.statut = 1;
    request.body.nom = request.params.nom; 
    request.body.prenom = request.params.prenom;
    request.body.email = request.params.email;
    request.body.telephone = request.params.telephone;

    request.body.password = request.params.password;
    Admin.create(request.body)
      .then(admin => {
          let message = `L'administrateur ${request.body.nom} ${request.body.prenom} a bien été crée.`;
          response.json({ message, data: admin });
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return response.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError){
          return response.status(400).json({message: error.message, data: error})
        }
        let message = `L'administrateur n'a pas pu être ajouter. Veuillez donc réessayer dans quelques instants.`;
        response.status(500).json({message, data: error});
      });
  });
}