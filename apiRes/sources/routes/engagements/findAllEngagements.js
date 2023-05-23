let { Engagement } = require('../../baseDeDonnees/sequelize'); // On importe dans point de terminaison (onPoint) le model administrateur fournit par notre module d'accueil sequelize
let { Op } = require('sequelize');
let auth = require('../../auth/auth');

module.exports = (app) => { // On exporte une fonction qui prend l'application express toute entière
    app.get('/api/engagement', /*auth,*/ (req, res) => {
        // let proprietes = ['email', 'montant', 'premontant', 'password', 'profile', 'reference', 'telephone'];
        const limit = Number(req.query.limit) || 5;   // On définie une variable limit qui le paramètre limit ou 5 par défaut
        if(req.query.montant){
            // Un récherche par le montant
            let montant = req.query.montant;
            if(montant.length < 2){
                let message = 'Le terme de recherche doit contenir au moins deux (2) caractères.';
                return res.status(400).json({message});
            }
            return Engagement.findAndCountAll({ // La méthode findAndCountAll() va chercher le montantbre total d'admin et le resultat demandé
                where: {
                    montant: {  // montant est la propriété du model administrateur
                        [Op.like]: `%${montant}%` // montant est un critère de recherche
                    }
                },
                order: ['montant'],     //la propriété order reenvoie une liste ordonnée d'élément
                limit: 5        // L'option limit permet de limiter le montantbre d'élément à récupérer
            })
            .then( ({count, rows}) => {
                let message = `Il y a ${count} administrateur(s) qui correspondent au terme de recherche ${montant}`;
                res.json({message, data: rows})
            })
        }else{
            // Et on passe la liste ordonnée reenvoyé par la propriété order à la méthode findAll()
            Engagement.findAll({ order: ['montant'] }) // On récupère tous nos administrateur présent dans la base de données grâce à la méthode findAll(), cette méthode retourne une promesse
            .then(admin => {
                let message = 'La liste des administrateurs a bien été récupérée.'
                res.json({ message, data: admin }) // On retourne directement notre réponse à l'intérieur de la méthode response.json() fournit par Express
            })
            .catch(error => {
                let message = `La liste n'a pas pu être récupérer. Veuillez donc réessayer dans quelques instants.`;
                res.status(500).json({message, data: error});
            });
        }
    })
}
