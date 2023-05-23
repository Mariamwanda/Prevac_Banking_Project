module.exports = app.get('/inscription', (req, res, next) => {
    res.render('creation');
    next();
})