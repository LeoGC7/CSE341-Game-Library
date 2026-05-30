const express = require('express')
const router = express.Router()
const gamesController = require('../controllers/games')
const {
    gameValidationRules,
    idValidationRule,
    checkValidationResult,
} = require('../validators/games')

router.get('/', gamesController.getGames)
router.get('/:id', idValidationRule, checkValidationResult, gamesController.getGameById)
router.post('/', gameValidationRules, checkValidationResult, gamesController.createGame)
router.put(
    '/:id',
    idValidationRule,
    gameValidationRules,
    checkValidationResult,
    gamesController.updateGame
)
router.delete('/:id', idValidationRule, checkValidationResult, gamesController.deleteGame)

module.exports = router
