const { body, param, validationResult } = require('express-validator')

const gameValidationRules = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    body('developer').notEmpty().withMessage('Developer is required').isString(),
    body('publisher').notEmpty().withMessage('Publisher is required').isString(),
    body('releaseDate')
        .notEmpty()
        .withMessage('Release date is required')
        .isString()
        .withMessage('Release date must be a string (YYYY-MM-DD)'),
    body('genre').notEmpty().withMessage('Genre is required').isString(),
    body('platform').isArray({ min: 1 }).withMessage('Platform must be a non-empty array'),
    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isFloat({ min: 0, max: 10 })
        .withMessage('Rating must be between 0 and 10'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('multiplayer')
        .notEmpty()
        .withMessage('Multiplayer is required')
        .isBoolean()
        .withMessage('Multiplayer must be true or false'),
]

const idValidationRule = [param('id').isMongoId().withMessage('Invalid ID format')]

const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array(),
        })
    }
    next()
}

module.exports = {
    gameValidationRules,
    idValidationRule,
    checkValidationResult,
}
