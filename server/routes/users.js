const router = require('express').Router()
const manager = require('../controllers/users')
const {verifyAccess} = require('../authentication/verify')

router.get('/',verifyAccess,manager.getHome)
router.post('/login',manager.login)
router.post('/signup',manager.signup)


module.exports = router