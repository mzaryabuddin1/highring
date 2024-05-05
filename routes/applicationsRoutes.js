const router = require('express').Router()
const Ctrl = require('../contollers/applications.controller')
const appauth = require('../middleware/auth')
const employer_auth = require('../middleware/employer_auth')
const employee_auth = require('../middleware/employee_auth')

router.get('/', appauth, employee_auth, Ctrl.getAll)


module.exports = router