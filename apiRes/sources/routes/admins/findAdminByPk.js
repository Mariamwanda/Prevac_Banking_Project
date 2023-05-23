
let { Admin } = require('../../baseDeDonnees/sequelize');
let auth = require('../../auth/auth');

module.exports = (app) => {
  app.get('/api/admins/:id', /*auth,*/ (request, response) => {
    Admin.findByPk(request.params.id)
    .then(admin => {
      if(admin === null){
        let message = "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
        return response.status(404).json({ message });
      }
      let message = `L'administrateur ${admin.nom} ${admin.nom} a bien été trouvé.`;
      response.json({ message, data: admin });
    })
    .catch(error => {
      let message = "L'administrateur n'a pas été récupérer. Veuillez donc réesszyer dans quelques instants.";
      response.status(500).json({message, data: error})
    })
  });
}