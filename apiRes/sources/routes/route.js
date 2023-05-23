const express = require('express')
const router = express.Router()


router.get('/hello', (req, res) => {
    console.log(req)
    res.send('requette recu')
})

router.get('/sigin', (req, res) => {
    console.log(req)
    res.render('/inscription')
})

router.get('/login', (req, res) => {
    console.log(req)
    res.render('/connexion')
})

router.get('/suivant', (req, res) => {
    console.log(req)
    res.render('/suivant')
})

router.get('/inscriptio', (req, res) => {
    console.log(req)
    res.render('/inscription')
})

module.exports = router