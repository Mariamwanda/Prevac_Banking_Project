let { Admin } = require('../../baseDeDonnees/sequelize')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let privateKey = require('../../auth/private_key')
module.exports = (app) => {
  app.post('/api/login/admin', (req, res) => {
    Admin.findOne({ where: { email: req.body.email } }).then(admin => {
      console.log(admin)
      if(! admin){
        const message = "Ce compte n'existe pas."
        return res.status(400).json({message})
      }
      bcrypt.compare(req.body.password, admin.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrecte.`;
          return res.status(400).json({ message })
        }

        // Jsonwebtoken (jeton)
        let token = jwt.sign( // On génère le jeton jwt avec la méthode sign() du modue jsonwebtoken
          {id_admin: admin.id},
          privateKey,
          {expiresIn: '24h'}
        )

        const message = `La connexion a été connecté avec succès`;
        return res.json({ message, data: admin, token })
      })
    })
    .catch(error => {
      const message = "Connexion échouée. Réessayez dans quelques instant.";
      return res.json({message})
    })
  });
}