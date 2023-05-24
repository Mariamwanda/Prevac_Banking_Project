let bcrypt = require("bcrypt");
let { Admin } = require('./../sources/baseDeDonnees/sequelize');
let { Solde } = require('./../sources/baseDeDonnees/sequelize');
let { Configuration } = require('./../sources/baseDeDonnees/sequelize');
let { Engagement } = require('./../sources/baseDeDonnees/sequelize');
let auth = require('./../sources/auth/auth');
let jwt = require('jsonwebtoken');
let privateKey = require('./../sources/auth/private_key');

// let http = require("http");
let { ValidationError, UniqueConstraintError, Op, QueryTypes } = require('sequelize');

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

let conf = '';
async function fetchConfigs(){
    const response = await fetch('http://localhost:3001/configurations');
    const cle = await response.json();
    conf = cle.data[0]; 
} 

fetchConfigs();



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

  static espaceUser(req, res) {
    res.render("espaceUser");
  }

  static profile(req, res) {
    res.render("profile");
  }

  

  static createAdmin(req, res) {
    req.body.reference = `IBANK-${genererChaineAleatoire().toUpperCase()}`;
    req.body.statut = 1;
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      req.body.password = hash;
      Admin.create(req.body)
      .then((admin) => {
        // let message = `L'administrateur ${req.body.nom} ${req.body.prenom} a bien été crée.`;
        res.render("suivant", { admin, conf });
        // res.json({ message, data: admin });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        let message = `L'administrateur n'a pas pu être ajouter. Veuillez donc réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });

    })
    
  }

  static deleteAdmin(req, res) {
    Admin.findByPk(req.params.id) // On récupère d'abord le sujet avant de le supprimer
      .then((admin) => {
        if (admin === null) {
          let message =
            "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        let adminDeleted = admin;
        return Admin.destroy({ where: { id: admin.id } }) // On supprime définitivement le sujet récupéré
          .then((_) => {
            let message = `L'administrateur avec l'identifiant n°${adminDeleted.id} a bien été supprimé.`;
            res.json({ message, data: adminDeleted });
          });
      })
      .catch((error) => {
        let message = `L'administrateur n'a pas pu être supprimer. Veuillez donc réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  }

  static updateAdmin(req, res) {
    let id = req.params.id;
    Admin.update(req.body, { where: { id: id } })
      .then((_) => {
        return Admin.findByPk(id).then((admin) => {
          if (admin === null) {
            let message =
              "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
            return res.status(404).json({ message });
          }
          let message = `L'administrateur dont l'ID est ${admin.id}, de référence ${admin.reference} et de nom ${admin.nom} ${admin.prenom} a bien été modifié.`;
          res.json({ message, data: admin });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        let message = `L'administrateur n'a pas pu être modifier. Veuillez donc réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  }

  static getAllAdmin(req, res) {
    // let proprietes = ['email', 'nom', 'prenom', 'password', 'profile', 'reference', 'telephone'];
    const limit = Number(req.query.limit) || 5; // On définie une variable limit qui le paramètre limit ou 5 par défaut
    if (req.query.nom) {
      // Un récherche par le nom
      let nom = req.query.nom;
      if (nom.length < 2) {
        let message =
          "Le terme de recherche doit contenir au moins deux (2) caractères.";
        return res.status(400).json({ message });
      }
      return Admin.findAndCountAll({
        // La méthode findAndCountAll() va chercher le nombre total d'admin et le resultat demandé
        where: {
          nom: {
            // nom est la propriété du model administrateur
            [Op.like]: `%${nom}%`, // nom est un critère de recherche
          },
        },
        order: ["nom"], //la propriété order reenvoie une liste ordonnée d'élément
        limit: 5, // L'option limit permet de limiter le nombre d'élément à récupérer
      }).then(({ count, rows }) => {
        let message = `Il y a ${count} administrateur(s) qui correspondent au terme de recherche ${nom}`;
        res.json({ message, data: rows });
      });
    } else {
      // Et on passe la liste ordonnée reenvoyé par la propriété order à la méthode findAll()
      Admin.findAll({ order: ["nom"] }) // On récupère tous nos administrateur présent dans la base de données grâce à la méthode findAll(), cette méthode retourne une promesse
        .then((admin) => {
          let message = "La liste des administrateurs a bien été récupérée.";
          res.json({ message, data: admin }); // On retourne directement notre réponse à l'intérieur de la méthode response.json() fournit par Express
        })
        .catch((error) => {
          let message = `La liste n'a pas pu être récupérer. Veuillez donc réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    }
  }

  static getAdminByPK(req, res) {
    Admin.findByPk(req.params.id)
      .then((admin) => {
        if (admin === null) {
          let message =
            "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        let message = `L'administrateur ${admin.nom} ${admin.nom} a bien été trouvé.`;
        res.json({ message, data: admin });
      })
      .catch((error) => {
        let message =
          "L'administrateur n'a pas été récupérer. Veuillez donc réesszyer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  }

  static configuration(req, res) {
    // let proprietes = ['email', 'nom', 'prenom', 'password', 'profile', 'reference', 'telephone'];
    const limit = Number(req.query.limit) || 5; // On définie une variable limit qui le paramètre limit ou 5 par défaut
    if (req.query.raisonSociale) {
      // Un récherche par le nom
      let raisonSociale = req.query.raisonSociale;
      if (raisonSociale.length < 2) {
        let message =
          "Le terme de recherche doit contenir au moins deux (2) caractères.";
        return res.status(400).json({ message });
      }
      return Configuration.findAndCountAll({
        // La méthode findAndCountAll() va chercher le nombre total d'admin et le resultat demandé
        where: {
          raisonSociale: {
            // nom est la propriété du model administrateur
            [Op.like]: `%${raisonSociale}%`, // nom est un critère de recherche
          },
        },
        order: ["raisonSociale"], //la propriété order reenvoie une liste ordonnée d'élément
        limit: 5, // L'option limit permet de limiter le nombre d'élément à récupérer
      }).then(({ count, rows }) => {
        let message = `Il y a ${count} administrateur(s) qui correspondent au terme de recherche ${raisonSociale}`;
        res.json({ message, data: rows });
      });
    } else {
      // Et on passe la liste ordonnée reenvoyé par la propriété order à la méthode findAll()
      Configuration.findAll({ order: ["raisonSociale"] }) // On récupère tous nos administrateur présent dans la base de données grâce à la méthode findAll(), cette méthode retourne une promesse
        .then((config) => {
          let message = "La liste des administrateurs a bien été récupérée.";
          res.json({ message, data: config }); // On retourne directement notre réponse à l'intérieur de la méthode response.json() fournit par Express
        })
        .catch((error) => {
          let message = `La liste n'a pas pu être récupérer. Veuillez donc réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    }
  }

  static async createEngagement(req, res) {
    req.body.reference = `IBANK-${genererChaineAleatoire().toUpperCase()}`;
    req.body.periode = parseInt(req.body.periode);
    req.body.montant = parseInt(req.body.montant);
    req.body.moyen_paiement = req.body.moyen_paiement;
    req.body.compte_paiement = req.body.compte_paiement;
    req.body.statut = 1;
    req.body.montant =  parseInt(req.body.montant);
    req.body.id_client = Number(req.body.id_client);

    await Engagement.create(req.body)
      .then((engag) => {
        res.render("connexion");
        // let message = `L'administrateur ${req.body.nom} ${req.body.prenom} a bien été crée.`;
        // res.json({ message, data: admin });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
            const message = "Certains champs ne sont pas correctement remplit"
            res.render("suivant", { message });
        //   return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
            const message = "Ce compte est déjà utilisé";
            res.render("suivant", { message });
        //   return res.status(400).json({ message: error.message, data: error });
        }
        let message = `L'administrateur n'a pas pu être ajouter. Veuillez donc réessayer dans quelques instants.`;
        res.render("suivant", { message });
        // res.status(500).json({ message, data: error });
      });
  }

  // Connexion
  static authentification(req, res){
    Admin.findOne({ where: { email: req.body.email } }).then(admin => {
      console.log(admin)
      if(! admin){
        const message = "Ce compte n'existe pas."
        res.render("connexion", { message})
        // return res.status(400).json({message})
      }
      bcrypt.compare(req.body.password, admin.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrecte.`;
          res.render("connexion", { message})
          // return res.status(400).json({ message })
        }

        // Jsonwebtoken (jeton)
        let token = jwt.sign( // On génère le jeton jwt avec la méthode sign() du modue jsonwebtoken
          {id_admin: admin.id},
          privateKey,
          {expiresIn: '24h'}
        )
        const message = `La connexion a été connecté avec succès`;
        // return res.json({ message, data: admin, token })
        res.render("espaceUser", { message, data: admin, token })
      })
    })
    .catch(error => {
      const message = "Connexion échouée. Réessayez dans quelques instant.";
      res.render("connexion", { message})
      // return res.json({message})
    })
  }
}

module.exports = IndexController;