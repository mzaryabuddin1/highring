const router = require('express').Router()
const Ctrl = require('../contollers/applications.controller')
const appauth = require('../middleware/auth')
const employer_auth = require('../middleware/employer_auth')
const employee_auth = require('../middleware/employee_auth')

router.get('/', appauth, employee_auth, Ctrl.getAll)
router.get('/:application_id', appauth, employee_auth, Ctrl.get)
router.get('/job/:job_id', appauth, employer_auth, Ctrl.getagainstjob)


module.exports = router