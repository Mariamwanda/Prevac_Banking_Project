const express = require('express')
const router = express.Router()

router.get('/hello', (req, res) => {
    console.log(req)
    res.send('requette recu')
})

module.exports = router