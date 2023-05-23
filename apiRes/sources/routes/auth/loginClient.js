let { Client } = require('../../baseDeDonnees/sequelize');
let bcrypt = require('bcrypt')
module.exports = (app) => {
    app.post('/api/login/client', (req, res) => {
        Client.findOne({ where: { email: req.body.email } }).then(client => {
        if(!client){
            const message = "Ce compte n'existe pas."
            return res.status(400).json({message})
        }
        bcrypt.compare(req.body.password, client.password).then(isPasswordValid => {
            if(!isPasswordValid) {
            const message = `Le mot de passe est incorrecte.`;
                return res.status(400).json({ message })
            }
            const message = `La connexion a été connecté avec succès`;
            return res.json({ message, data: client })
        })
        })
        .catch(error => {
            const message = "Connexion échouée. Réessayez dans quelques instant.";
            return res.json({message, data: client})
        })
    })
}