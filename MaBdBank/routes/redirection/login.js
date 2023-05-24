module.exports = app.get('/login', (req, res, next) => {
    res.render('connexion');
    next();
})