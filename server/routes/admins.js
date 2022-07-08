const router = require('express').Router()
const manager = require('../controllers/admins.js')



router.get('/',manager.getHome)



module.exports = router