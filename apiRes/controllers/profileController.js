let { Admin } = require('../sources/baseDeDonnees/sequelize');
let { ValidationError, UniqueConstraintError, Op, QueryTypes, json } = require('sequelize'); 

class ProfileControllers{
    static profile(req, res) {
        res.render("profile");
    }
}