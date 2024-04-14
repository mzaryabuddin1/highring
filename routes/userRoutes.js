const router = require('express').Router()
const userCtrl = require('../contollers/user.controller')
const appauth = require('../middleware/auth')

router.post('/', userCtrl.add)
router.get('/', appauth, userCtrl.get)

module.exports = router