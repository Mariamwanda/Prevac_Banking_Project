const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const browserify = require('browserify');
// const testRouter =  require('./sources/routes/route')
const indexRoute = require('./routes')

const path = require('path');

const sequelize = require("./sources/baseDeDonnees/sequelize");

const app = express();
let port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded(
    { extended: false})
);


app.set('views', './views');
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Définir un middleware
app.use(favicon(__dirname+'/favicon.png'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'));
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
});
app.use(bodyParser.json());

sequelize.initBaseDeDonnees();

app.use(indexRoute);

// app.get('/', (req, res, next) => {
//     res.render('index');
//     next();
// })

// app.get('/inscription', (req, res, next) => {
//     res.render('./inscription');
//     next();
// })

// let alla = '';
// async function fetchAdmins(){
//     const response = await fetch('http://localhost:3001/api/admins');
//     const cle = await response.json();
//     alla = cle.data;
// }
// 
// let conf = '';
// async function fetchConfigs(){
//     const response = await fetch('http://localhost:3001/api/configurations');
//     const cle = await response.json();
//     conf = cle.data; 
// } 
// 
// fetchAdmins();
// fetchConfigs();

// app.get('/suivant', (req, res, next) =>{
//     res.render('suivant', {data: alla, conf: conf});
//     next();
// });
// 
// app.get('/login', (req, res, next) => {
//     res.render('connexion');
//     next();
// });

// // On définit nos points de terminaisons de CRUD sur administrateur (onPoint)
// require('./sources/routes/admins/findAllAdmins')(app) // On importe le point de terminaison
// require('./sources/routes/admins/findAdminByPk')(app);
// require('./sources/routes/admins/createAdmin')(app);
// require('./sources/routes/admins/updateAdmin')(app);
// require('./sources/routes/admins/deleteAdmin')(app);
// // On définit nos points de terminaisons de CRUD sur client (onPoint)
// require('./sources/routes/clients/findAllClients')(app) // On importe le point de terminaison
// require('./sources/routes/clients/findClientByPk')(app);
// require('./sources/routes/clients/createClient')(app);
// require('./sources/routes/clients/updateClient')(app);
// require('./sources/routes/clients/deleteClient')(app);
// 
// require('./sources/routes/configurations/createContiguration')(app);
// require('./sources/routes/configurations/findConfiguration')(app);
// require('./sources/routes/configurations/uptateConfiguration')(app);
// 
// // On définit nos points de terminaisons de l'authentification sur client (onPoint)
// require('./sources/routes/auth/login')(app);
// require('./sources/routes/auth/loginClient')(app);





// La gestion des erreurs de type 404 (Page no fond)
app.use(({res}) => {
    let message = 'Impossible de trouver la ressource demandée ! Veuillez donc s\'il-vous-plaît essayer la bonne url (lien) !';
    res.status(500).json({message});
});

app.listen(port, () => console.log(`Votre application Node est démarrée sur le port: http://localhost:${port}`));
