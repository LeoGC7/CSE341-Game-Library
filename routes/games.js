const express = require('express')
const router = express.Router()
const gamesController = require('../controllers/games')
const {
    gameValidationRules,
    idValidationRule,
    checkValidationResult,
} = require('../validators/games')
const { isAuthenticated } = require('../middleware/auth')

router.get('/', gamesController.getGames)
router.get('/:id', idValidationRule, checkValidationResult, gamesController.getGameById)
router.post(
    '/',
    /*  #swagger.security = [{ "cookieAuth": [] }] */
    isAuthenticated,
    gameValidationRules,
    checkValidationResult,
    gamesController.createGame
)
router.put(
    '/:id',
    /*  #swagger.security = [{ "cookieAuth": [] }] */
    isAuthenticated,
    idValidationRule,
    gameValidationRules,
    checkValidationResult,
    gamesController.updateGame
)
router.delete(
    '/:id',
    /*  #swagger.security = [{ "cookieAuth": [] }] */
    isAuthenticated,
    idValidationRule,
    checkValidationResult,
    gamesController.deleteGame
)

module.exports = router
