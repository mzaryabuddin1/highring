const router = require('express').Router()
const Ctrl = require('../contollers/feilds.controller')
const appauth = require('../middleware/auth')


router.get('/', appauth, Ctrl.get)
router.get('/pending', appauth, Ctrl.pending)
router.post('/', appauth, Ctrl.add_feild)
router.put('/', appauth, Ctrl.update_feild)


module.exports = router