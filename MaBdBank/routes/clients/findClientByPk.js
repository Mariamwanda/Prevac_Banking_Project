let { Client } = require('../../baseDeDonnees/sequelize');
let auth = require('../../auth/auth');

module.exports = (app) => {
  app.get('/api/clients/:id', auth, (request, response) => {
    Client.findByPk(request.params.id)
    .then(client => {
      if(client === null){
        let message = "Le client n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
        return response.status(404).json({ message });
      }
      let message = `Le client ${client.nom} ${client.prenom} a bien été trouvé.`;
      response.json({ message, data: client });
    })
    .catch(error => {
      let message = "Le client n'a pas été récupérer. Veuillez donc réesszyer dans quelques instants.";
      response.status(500).json({message, data: error})
    })
  });
}