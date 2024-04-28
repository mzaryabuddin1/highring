const router = require('express').Router()
const userCtrl = require('../contollers/user.controller')
const appauth = require('../middleware/auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/', appauth, userCtrl.get)

module.exports = router