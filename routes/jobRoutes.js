const router = require('express').Router()
const Ctrl = require('../contollers/job.controller')
const appauth = require('../middleware/auth')
const employer_auth = require('../middleware/employer_auth')
const employee_auth = require('../middleware/employee_auth')

router.post('/', appauth, employer_auth, Ctrl.add)
router.get('/:job_id', appauth, Ctrl.get)
router.get('/', appauth, employer_auth, Ctrl.getAll)
router.patch('/:job_id', appauth, employer_auth, Ctrl.update)
router.post('/apply/:job_id', appauth, employee_auth, Ctrl.apply)


module.exports = router