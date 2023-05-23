let { Admin } = require('../../baseDeDonnees/sequelize');
let { ValidationError, UniqueConstraintError } = require('sequelize');
let auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/admins/:id', /*auth,*/ (request, response) => {
        let id = request.params.id;
        Admin.update(request.body, { where: { id: id } })
        .then(_ => {
            return Admin.findByPk(id)
            .then(admin => {
                if(admin === null){
                    let message = "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
                    return response.status(404).json({ message });
                }
                let message = `L'administrateur dont l'ID est ${admin.id}, de référence ${admin.reference} et de nom ${admin.nom} ${admin.prenom} a bien été modifié.`;
                response.json({message, data: admin});
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
            let message = `L'administrateur n'a pas pu être modifier. Veuillez donc réessayer dans quelques instants.`;
            response.status(500).json({message, data: error});
        });
    });
}