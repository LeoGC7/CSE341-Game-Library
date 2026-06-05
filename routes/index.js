const express = require('express')
const router = express.Router()

router.use('/games', require('./games'))
router.use('/reviews', require('./reviews'))
router.use('/auth', require('./auth'))

module.exports = router
