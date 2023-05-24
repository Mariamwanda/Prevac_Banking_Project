let { Client } = require('../../baseDeDonnees/sequelize'); // On importe dans point de terminaison (onPoint) le model client fournit par notre module d'accueil sequelize
let { Op } = require('sequelize');
let auth = require('../../auth/auth');

module.exports = (app) => { // On exporte une fonction qui prend l'application express toute entière
    app.get('/api/clients', auth, (req, res) => {
        // let proprietes = ['email', 'nom', 'prenom', 'password', 'profile', 'reference', 'telephone'];
        const limit = Number(req.query.limit) || 5;   // On définie une variable limit qui le paramètre limit ou 5 par défaut
        if(req.query.nom){
            // Un récherche par le nom
            let nom = req.query.nom;
            if(nom.length < 2){
                let message = 'Le terme de recherche doit contenir au moins deux (2) caractères.';
                return res.status(400).json({message});
            }
            return Client.findAndCountAll({ // La méthode findAndCountAll() va chercher le nombre total d'admin et le resultat demandé
                where: {
                    nom: {  // nom est la propriété du model client
                        [Op.like]: `%${nom}%` // nom est un critère de recherche
                    }
                },
                order: ['nom'],     //la propriété order reenvoie une liste ordonnée d'élément
                limit: 5        // L'option limit permet de limiter le nombre d'élément à récupérer
            })
            .then( ({count, rows}) => {
                let message = `Il y a ${count} client(s) qui correspondent au terme de recherche ${nom}`;
                res.json({message, data: rows})
            })
        }else if(req.query.prenom){
            // Un récherche par le prenom
            let prenom = req.query.prenom;
            if(prenom.length < 2){
                let message = 'Le terme de recherche doit contenir au moins deux (2) caractères.';
                return res.status(400).json({message});
            }
            return Client.findAndCountAll({ // La méthode findAndCountAll() va chercher le nombre total d'admin et le resultat demandé
                where: {
                    prenom: {  // prenom est la propriété du model client
                        [Op.like]: `%${prenom}%` // prenom est un critère de recherche
                    }
                },
                order: ['prenom'],     //la propriété order reenvoie une liste ordonnée d'élément
                limit: 5        // L'option limit permet de limiter le nombre d'élément à récupérer
            })
            .then( ({count, rows}) => {
                let message = `Il y a ${count} client(s) qui correspondent au terme de recherche ${prenom}`;
                res.json({message, data: rows})
            })
        }else if(req.query.reference){
             // Un récherche par le reference
            let reference = req.query.reference;
            if(reference.length < 2){
                let message = 'Le terme de recherche doit contenir au moins deux (2) caractères.';
                return res.status(400).json({message});
            }
            return Client.findAndCountAll({ // La méthode findAndCountAll() va chercher le nombre total d'admin et le resultat demandé
                where: {
                    reference: {  // reference est la propriété du model client
                        [Op.like]: `%${reference}%` // reference est un critère de recherche
                    }
                },
                order: ['reference'],     //la propriété order reenvoie une liste ordonnée d'élément
                limit: 5        // L'option limit permet de limiter le nombre d'élément à récupérer
            })
            .then( ({count, rows}) => {
                let message = `Il y a ${count} client(s) qui correspondent au terme de recherche ${reference}`;
                res.json({message, data: rows})
            })
        }else{
            // Et on passe la liste ordonnée reenvoyé par la propriété order à la méthode findAll()
            Client.findAll({ order: ['nom'] }) // On récupère tous nos client présent dans la base de données grâce à la méthode findAll(), cette méthode retourne une promesse
            .then(client => {
                let message = 'La liste des clients a bien été récupérée.'
                res.json({ message, data: client }) // On retourne directement notre réponse à l'intérieur de la méthode response.json() fournit par Express
            })
            .catch(error => {
                let message = `La liste n'a pas pu être récupérer. Veuillez donc réessayer dans quelques instants.`;
                res.status(500).json({message, data: error});
            });
        }
    })
}
