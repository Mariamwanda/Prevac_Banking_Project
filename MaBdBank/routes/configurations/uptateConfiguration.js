let { Configuration } = require('../../baseDeDonnees/sequelize');
let { ValidationError, UniqueConstraintError } = require('sequelize');
let auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/configuration/:id', /*auth,*/ (request, response) => {
        let id = request.params.id;
        Configuration.update(request.body, { where: { id: id } })
        .then(_ => {
            return Configuration.findByPk(id)
            .then(config => {
                if(config === null){
                    let message = "Les données n'ont pas été trouvées. Veuillez donc réessayer avec un autre identifiant.";
                    return response.status(404).json({ message });
                }
                let message = `Les données dont l'ID est ${config.id}, de référence ${config.reference} et de nom ${config.raisonSociale} ${config.accromine} a bien été modifié.`;
                response.json({message, data: config});
            })
            // .catch(error => {
            //     let message = `L'administrateur n'a pas pu être modifier. Veuillez donc réessayer dans quelques instants.`;
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
            let message = `Les données n'ont pu être modifier. Veuillez donc réessayer dans quelques instants.`;
            response.status(500).json({message, data: error});
        });
    });
}