let bcrypt = require("bcrypt");
let { Admin } = require('./../sources/baseDeDonnees/sequelize');
let { Solde } = require('./../sources/baseDeDonnees/sequelize');
let { Configuration } = require('./../sources/baseDeDonnees/sequelize');
let { Engagement } = require('./../sources/baseDeDonnees/sequelize');
let { sequelize } = require('./../sources/baseDeDonnees/sequelize');
let auth = require('./../sources/auth/auth');
let jwt = require('jsonwebtoken');
let privateKey = require('./../sources/auth/private_key');

// let http = require("http");
let { ValidationError, UniqueConstraintError, Op, QueryTypes, json } = require('sequelize'); 

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

// let conf = '';
// async function fetchConfigs(){
//     const res = await fetch('http://localhost:30000/configurations');
//     const cle = await res.json();
//     conf = cle.data[0]; 
// } 
// 
// fetchConfigs();



class IndexController {
  // Rédirection vers la page de test
  static index(req, res) {
    res.render("newIndex");
  }
  // Rédirection vers la page d'accueil
  static accueil(req, res) {
    res.render("index", { title: 'Express', session : req.session } );
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
        Configuration.findOne({where: {id:1}}).then(conf=>{
          res.render("suivant", { admin, conf });
        })
        
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
          let message = "L'administrateur n'a pas été trouvé. Veuillez donc réessayer avec un autre identifiant.";
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
          res.json({ message, data: admin }); // On retourne directement notre réponse à l'intérieur de la méthode res.json() fournit par Express
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
          res.json({ message, data: config }); // On retourne directement notre réponse à l'intérieur de la méthode res.json() fournit par Express
        })
        .catch((error) => {
          let message = `La liste n'a pas pu être récupérer. Veuillez donc réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    }
  }

  static async createEngagement(req, res) {
    let add = await Admin.findOne({where:{id: req.body.id_client}});
    req.body.reference = add.reference;
    // console.log('ADD============================================================', add);
    // console.log('reference============================================================', req.body.reference);
    req.body.periode = parseInt(req.body.periode);
    req.body.montant = parseInt(req.body.montant);
    req.body.moyen_paiement = req.body.moyen_paiement;
    req.body.compte_paiement = req.body.compte_paiement;
    req.body.statut = 1;
    req.body.montant =  parseInt(req.body.montant);
    req.body.id_client = Number(req.body.id_client);
    // console.log('reference============================================================', req.body.reference);
    console.log('all============================================================', req.body);
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
      Solde.create(req.body)
  }

  // Connexion
  static authentification(req, res){
    Admin.findOne({ where: { email: req.body.email } }).then(admin => {
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
          {id_admin: admin.id, email_admin: admin.email},
          privateKey,
          {expiresIn: '24h'}
        )
        const message = `La connexion a été connecté avec succès`;
        // return res.json({ message, data: admin, token })
        
        req.session.user_id = admin.dataValues.id;
        req.session.user_reference = admin.dataValues.reference;
        req.session.user_email = admin.dataValues.email;
        req.session.user_password = admin.dataValues.password;
        req.session.user_nom = admin.dataValues.nom;
        req.session.user_prenom = admin.dataValues.prenom 
        Engagement.findOne({where:{reference: admin.dataValues.reference}}).then(inf=>{
          Solde.findOne({where:{reference: admin.dataValues.reference}}).then(key=>{
            const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
            // La date du jour
            let dateAujourdhui = new Date(inf.created_at);
            console.log("###########################################################################################################", dateAujourdhui)

            let option = {weekday: "long"};
            let jourActuel = dateAujourdhui.toLocaleDateString("fr-FR", option);
            jourActuel = jourActuel.charAt(0).toLocaleUpperCase()+jourActuel.slice(1);
            let tableauJourOrdonnes = jours.slice(jours.indexOf(jourActuel)).concat(jours.slice(0, jours.indexOf(jourActuel)));
            let compteur = 0;
            
            console.log("=====================================================================================================================", typeof(key.periode), key.periode, key)
            res.render("espaceUser", { message, data: admin, token, session : req.session, inf, key, tableauJourOrdonnes, compteur, dateAujourdhui })
          })
        })
      })
    })
    .catch(error => {
      const message = "Connexion échouée. Réessayez dans quelques instant.";
      res.render("connexion", { message})
      // return res.json({message})
    })
  }
  static deconnexion(request, response, next){
    request.session.destroy();
    response.render("connexion");
  }
}
// function calendier(debuit, duree){
//   // Les jours de la semaine
//   const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
//   // La date du jour
//   let dateAujourdhui = new Date(debuit);
//   let dateFin =dateAujourdhui+duree*24*60*60*1000;
//   let option = {weekday: "long"};
//   let jourActuel = dateAujourdhui.toLocaleDateString("fr-FR", option);
//   jourActuel = jourActuel.charAt(0).toLocaleUpperCase()+jourActuel.slice(1);
//   let tableauJourOrdonnes = jours.slice(jours.indexOf(jourActuel)).concat(jours.slice(0, jours.indexOf(jourActuel)));
//   return tableauJourOrdonnes;
// }

module.exports = IndexController;