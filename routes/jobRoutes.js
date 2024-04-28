const router = require('express').Router()
const Ctrl = require('../contollers/job.controller')
const appauth = require('../middleware/auth')

router.post('/', Ctrl.add)
router.post('/', Ctrl.login)
router.get('/', appauth, Ctrl.get)

module.exports = router