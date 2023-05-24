const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const browserify = require('browserify');
// const sequelizeCli = require('sequelize-cli')

const indexRoute = require('./routes')
const path = require('path');
const app = express();
let port = process.env.PORT || 3002;
app.use(bodyParser.urlencoded(
    { extended: false})
);


// 
// app.get('/show',function(req,res) {
//   baseDonnes.query("select * from administrateurs", function (err, result) {
//     if (err) throw err;
//     else {
//       obj = {print: result};
//       console.log(obj);
//       res.json({obj});
//     }
//   })
// })
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


app.use(indexRoute);


app.use(({res}) => {
    let message = 'Impossible de trouver la ressource demandée ! Veuillez donc s\'il-vous-plaît essayer la bonne url (lien) !';
    res.status(500).json({message});
});

app.listen(port, () => console.log(`Votre application Node est démarrée sur le port: http://localhost:${port}`));
