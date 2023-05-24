const express = require('express');
const Route = express.Router();
const IndexController = require('../controllers/indexController');

Route.get('/', IndexController.accueil);
Route.get('/apropos', IndexController.apropos);
Route.get('/contact', IndexController.contact);
Route.get('/inscription', IndexController.inscription);
Route.get('/suivant', IndexController.suivant);
Route.get('/connexion', IndexController.connexion);
Route.get('/show', IndexController.showAdmin)
// 
Route.post('/inscription', IndexController.adminCreate)
// Route.get('/salut', IndexController.index);
// 
// Route.get('/configurations', IndexController.configuration);
// 
// Route.post('/inscription', IndexController.createAdmin);
// Route.get('/getAllAdmin', IndexController.getAllAdmin);
// 
// Route.post('/saveEngagement', IndexController.createEngagement);


module.exports = Route;