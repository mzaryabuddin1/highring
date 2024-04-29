const router = require('express').Router()
const Ctrl = require('../contollers/recruit_me.controller')
const appauth = require('../middleware/auth')


router.get('/', appauth, Ctrl.get)

module.exports = router