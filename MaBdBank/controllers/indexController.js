const baseDonnes = require("./../config");
// Permet de générer des codes de références aléatoires
function genererChaineAleatoire(){
  const caract = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let longueurMax = caract.length;
    let chaineAleatoire = '';
    for (let i = 0; i < 25; i++){
        chaineAleatoire += caract[Math.floor(Math.random()*longueurMax)];
    }
    return chaineAleatoire;
}

class IndexController {
  // Rédirection vers la page de test
  static index(req, res) {
    res.render("newIndex");
  }
  // Rédirection vers la page d'accueil
  static accueil(req, res) {
    res.render("index");
  }
  // Rédirection vers la page de contact
  static contact(req, res) {
    res.render("contact");
  }
  // Rédirection vers la page a propos
  static apropos(req, res) {
    res.render("apropos");
  }
  // Rédirection vers la page d'inscription
  static inscription(req, res) {
    res.render("inscription");
  }
  // Rédirection vers la page d'engagement
  static suivant(req, res) {
    res.render("suivant");
  }
  // Rédirection vers la page de connexion
  static connexion(req, res) {
    res.render("connexion");
  }
  static showAdmin(req, res) {
    baseDonnes.query("select * from administrateurs", function (err, result) {
      if (err) throw err;
      else {
        res.json({ result });
      }
    });
  }

  static adminCreate(req, res) {
    baseDonnes.connect( function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `INSERT INTO administrateurs (reference, nom, prenom, email, telephone, password, profile, statut) VALUES ('${genererChaineAleatoire()}','${req.body.nom}','${req.body.prenom}','${req.body.email}','${req.body.telephone}','${req.body.profile}','${req.body.statut}')`;
        baseDonnes.query(sql, function(err, result){
            if (err) throw err;
            res.json({ result });
        });
    });
  }
  //
  //     static createAdmin(req, res){  
  //
  //         req.body.reference = `IBANK-${genererChaineAleatoire().toUpperCase()}`;
  //         req.body.statut = 1;
  //         // req.body.nom = req.params.nom;
  //         // req.body.prenom = req.params.prenom;
  //         // req.body.email = req.params.email;
  //         // req.body.telephone = req.params.telephone;
  //         // req.body.password = req.params.password;
  //         Admin.create(req.body)
  //         .then(admin => {
  //             // let message = `L'administrateur ${req.body.nom} ${req.body.prenom} a bien été crée.`;
  //             res.render('suivant', {admin, conf})
  //             // res.json({ message, data: admin });
  //         })
  //         .catch(error => {
  //             if(error instanceof ValidationError){
  //             return res.status(400).json({ message: error.message, data: error });
  //             }
  //             if(error instanceof UniqueConstraintError){
  //             return res.status(400).json({message: error.message, data: error})
  //             }
  //             let message = `L'administrateur n'a pas pu être ajouter. Veuillez donc réessayer dans quelques instants.`;
  //             res.status(500).json({message, data: error});
  //         });
  //     }
  //
  //     static deleteAdmin(req, res){
  //         Admin.findByPk(req.params.id) // On récupère d'abord le sujet avant de le supprimer
  //         .then(admin => {
  //             if(admin === null){
  //                 let message = "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
  //                 return res.status(404).json({ message });
  //             }
  //             let adminDeleted = admin;
  //             return Admin.destroy({ where: { id: admin.id }  }) // On supprime définitivement le sujet récupéré
  //             .then(_ => {
  //                 let message = `L'administrateur avec l'identifiant n°${adminDeleted.id} a bien été supprimé.`;
  //                 res.json({message, data: adminDeleted });
  //             });
  //         })
  //         .catch(error => {
  //             let message = `L'administrateur n'a pas pu être supprimer. Veuillez donc réessayer dans quelques instants.`;
  //             res.status(500).json({message, data: error});
  //         })
  //     }
  //
  //     static updateAdmin(req, res){
  //         let id = req.params.id;
  //         Admin.update(req.body, { where: { id: id } })
  //         .then(_ => {
  //             return Admin.findByPk(id)
  //             .then(admin => {
  //                 if(admin === null){
  //                     let message = "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
  //                     return res.status(404).json({ message });
  //                 }
  //                 let message = `L'administrateur dont l'ID est ${admin.id}, de référence ${admin.reference} et de nom ${admin.nom} ${admin.prenom} a bien été modifié.`;
  //                 res.json({message, data: admin});
  //             })
  //         })
  //         .catch(error => {
  //             if(error instanceof ValidationError){
  //                 return res.status(400).json({message: error.message, data: error})
  //             }
  //             if(error instanceof UniqueConstraintError){
  //                 return res.status(400).json({message: error.message, data: error})
  //             }
  //             let message = `L'administrateur n'a pas pu être modifier. Veuillez donc réessayer dans quelques instants.`;
  //             res.status(500).json({message, data: error});
  //         });
  //     }
  //
  //     static getAllAdmin(req, res){
  //         // let proprietes = ['email', 'nom', 'prenom', 'password', 'profile', 'reference', 'telephone'];
  //         const limit = Number(req.query.limit) || 5;   // On définie une variable limit qui le paramètre limit ou 5 par défaut
  //         if(req.query.nom){
  //             // Un récherche par le nom
  //             let nom = req.query.nom;
  //             if(nom.length < 2){
  //                 let message = 'Le terme de recherche doit contenir au moins deux (2) caractères.';
  //                 return res.status(400).json({message});
  //             }
  //             return Admin.findAndCountAll({ // La méthode findAndCountAll() va chercher le nombre total d'admin et le resultat demandé
  //                 where: {
  //                     nom: {  // nom est la propriété du model administrateur
  //                         [Op.like]: `%${nom}%` // nom est un critère de recherche
  //                     }
  //                 },
  //                 order: ['nom'],     //la propriété order reenvoie une liste ordonnée d'élément
  //                 limit: 5        // L'option limit permet de limiter le nombre d'élément à récupérer
  //             })
  //             .then( ({count, rows}) => {
  //                 let message = `Il y a ${count} administrateur(s) qui correspondent au terme de recherche ${nom}`;
  //                 res.json({message, data: rows})
  //             })
  //         }else{
  //             // Et on passe la liste ordonnée reenvoyé par la propriété order à la méthode findAll()
  //             Admin.findAll({ order: ['nom'] }) // On récupère tous nos administrateur présent dans la base de données grâce à la méthode findAll(), cette méthode retourne une promesse
  //             .then(admin => {
  //                 let message = 'La liste des administrateurs a bien été récupérée.'
  //                 res.json({ message, data: admin }) // On retourne directement notre réponse à l'intérieur de la méthode response.json() fournit par Express
  //             })
  //             .catch(error => {
  //                 let message = `La liste n'a pas pu être récupérer. Veuillez donc réessayer dans quelques instants.`;
  //                 res.status(500).json({message, data: error});
  //             });
  //         }
  //     }
  //
  //     static getAdminByPK(req, res){
  //         Admin.findByPk(req.params.id)
  //         .then(admin => {
  //         if(admin === null){
  //             let message = "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
  //             return res.status(404).json({ message });
  //         }
  //         let message = `L'administrateur ${admin.nom} ${admin.nom} a bien été trouvé.`;
  //         res.json({ message, data: admin });
  //         })
  //         .catch(error => {
  //         let message = "L'administrateur n'a pas été récupérer. Veuillez donc réesszyer dans quelques instants.";
  //         res.status(500).json({message, data: error})
  //         })
  //     }
  //
  //     static configuration(req, res){
  //         // let proprietes = ['email', 'nom', 'prenom', 'password', 'profile', 'reference', 'telephone'];
  //         const limit = Number(req.query.limit) || 5;   // On définie une variable limit qui le paramètre limit ou 5 par défaut
  //         if(req.query.raisonSociale){
  //             // Un récherche par le nom
  //             let raisonSociale = req.query.raisonSociale;
  //             if(raisonSociale.length < 2){
  //                 let message = 'Le terme de recherche doit contenir au moins deux (2) caractères.';
  //                 return res.status(400).json({message});
  //             }
  //             return Configuration.findAndCountAll({ // La méthode findAndCountAll() va chercher le nombre total d'admin et le resultat demandé
  //                 where: {
  //                     raisonSociale: {  // nom est la propriété du model administrateur
  //                         [Op.like]: `%${raisonSociale}%` // nom est un critère de recherche
  //                     }
  //                 },
  //                 order: ['raisonSociale'],     //la propriété order reenvoie une liste ordonnée d'élément
  //                 limit: 5        // L'option limit permet de limiter le nombre d'élément à récupérer
  //             })
  //             .then( ({count, rows}) => {
  //                 let message = `Il y a ${count} administrateur(s) qui correspondent au terme de recherche ${raisonSociale}`;
  //                 res.json({message, data: rows})
  //             })
  //         }else{
  //             // Et on passe la liste ordonnée reenvoyé par la propriété order à la méthode findAll()
  //             Configuration.findAll({ order: ['raisonSociale'] }) // On récupère tous nos administrateur présent dans la base de données grâce à la méthode findAll(), cette méthode retourne une promesse
  //             .then(config => {
  //                 let message = 'La liste des administrateurs a bien été récupérée.'
  //                 res.json({ message, data: config }) // On retourne directement notre réponse à l'intérieur de la méthode response.json() fournit par Express
  //             })
  //             .catch(error => {
  //                 let message = `La liste n'a pas pu être récupérer. Veuillez donc réessayer dans quelques instants.`;
  //                 res.status(500).json({message, data: error});
  //             });
  //         }
  //     }
  //
  //     static async createEngagement(req, res){
  //         req.body.reference = `IBANK-${genererChaineAleatoire().toUpperCase()}`;
  //         req.body.periode = parseInt(req.body.periode);
  //         req.body.montant = parseInt(req.body.montant);
  //         req.body.id_client = parseInt(req.body.id_client);
  //         req.body.statut = 1;
  //
  //         console.log("ENGAGEMENT+++++++++++++++++++++++++++++++++++++++++++++++", req.body)
  //        await Engagement.create(req.body)
  //         .then(engag => {
  //             console.log("+++++++++++++++++++++++++++++++++++++++++++++++", engag)
  //             res.render('/');
  //             // let message = `L'administrateur ${req.body.nom} ${req.body.prenom} a bien été crée.`;
  //             // res.json({ message, data: admin });
  //         })
  //         .catch(error => {
  //             if(error instanceof ValidationError){
  //             return res.status(400).json({ message: error.message, data: error });
  //             }
  //             if(error instanceof UniqueConstraintError){
  //             return res.status(400).json({message: error.message, data: error})
  //             }
  //             let message = `L'administrateur n'a pas pu être ajouter. Veuillez donc réessayer dans quelques instants.`;
  //             res.status(500).json({message, data: error});
  //         });
  //     }
}

module.exports = IndexController;
