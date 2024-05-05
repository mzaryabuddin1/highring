const router = require('express').Router()
const Ctrl = require('../contollers/job.controller')
const appauth = require('../middleware/auth')
const employer_auth = require('../middleware/employer_auth')

router.post('/', appauth, employer_auth, Ctrl.add)
router.get('/:job_id', appauth, Ctrl.get)
router.get('/', appauth, employer_auth, Ctrl.getAll)
router.patch('/:job_id', appauth, employer_auth, Ctrl.update)


module.exports = router