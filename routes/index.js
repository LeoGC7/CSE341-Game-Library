const express = require('express')
const router = express.Router()

router.use('/games', require('./games'))
router.use('/reviews', require('./reviews'))

module.exports = router
