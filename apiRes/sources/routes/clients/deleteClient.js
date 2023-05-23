let { Client } = require('../../baseDeDonnees/sequelize');
let auth = require('../../auth/auth');
  
module.exports = (app) => {
    app.delete('/api/clients/:id', auth, (request, response) => {
        Client.findByPk(request.params.id) // On récupère d'abord le sujet avant de le supprimer 
        .then(client => {
            if(client === null){
                let message = "Le client n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
                return response.status(404).json({ message });
            }
            let clientDeleted = client;
            return Client.destroy({ where: { id: client.id }  }) // On supprime définitivement le sujet récupéré 
            .then(_ => {
                let message = `Le client avec l'identifiant n°${clientDeleted.id} a bien été supprimé.`;
                response.json({message, data: clientDeleted });
            });
        })
        .catch(error => {
            let message = `Le client n'a pas pu être supprimer. Veuillez donc réessayer dans quelques instants.`;
            response.status(500).json({message, data: error});
        })
    })
}