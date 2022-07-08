const router = require('express').Router()
const manager = require('../controllers/users')


router.get('/',manager.getHome)

module.exports = router