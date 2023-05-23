let { Admin } = require('../../baseDeDonnees/sequelize');
let auth = require('../../auth/auth');
  
module.exports = (app) => {
    app.delete('/api/admins/:id', /*auth,*/ (request, response) => {
        Admin.findByPk(request.params.id) // On récupère d'abord le sujet avant de le supprimer 
        .then(admin => {
            if(admin === null){
                let message = "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
                return response.status(404).json({ message });
            }
            let adminDeleted = admin;
            return Admin.destroy({ where: { id: admin.id }  }) // On supprime définitivement le sujet récupéré 
            .then(_ => {
                let message = `L'administrateur avec l'identifiant n°${adminDeleted.id} a bien été supprimé.`;
                response.json({message, data: adminDeleted });
            });
        })
        .catch(error => {
            let message = `L'administrateur n'a pas pu être supprimer. Veuillez donc réessayer dans quelques instants.`;
            response.status(500).json({message, data: error});
        })
    })
}