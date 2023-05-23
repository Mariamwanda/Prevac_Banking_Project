let { Client } = require('../../baseDeDonnees/sequelize');
let { ValidationError, UniqueConstraintError } = require('sequelize');
let auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/clients/:id', auth, (request, response) => {
        let id = request.params.id;
        Client.update(request.body, { where: { id: id } })
        .then(_ => {
            return Client.findByPk(id)
            .then(client => {
                if(client === null){
                    let message = "Le client n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
                    return response.status(404).json({ message });
                }
                let message = `Le client dont l'ID est ${client.id}, de référence ${client.reference} et de nom ${client.nom} ${client.prenom} a bien été modifié.`;
                response.json({message, data: client});
            })
            // .catch(error => {
            //     let message = `Le client n'a pas pu être modifier. Veuillez donc réessayer dans quelques instants.`;
            //     response.status(500).json({message, data: error});
            // });
        
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return response.status(400).json({message: error.message, data: error})
            }
            if(error instanceof UniqueConstraintError){
                return response.status(400).json({message: error.message, data: error})
            }
            let message = `Le client n'a pas pu être modifier. Veuillez donc réessayer dans quelques instants.`;
            response.status(500).json({message, data: error});
        });
    });
}