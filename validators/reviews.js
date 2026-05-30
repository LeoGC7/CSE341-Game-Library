const { body, param, validationResult } = require('express-validator')

const reviewValidationRules = [
    body('gameId').notEmpty().withMessage('Game ID is required').isString(),
    body('author').notEmpty().withMessage('Author is required').isString(),
    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isFloat({ min: 0, max: 10 })
        .withMessage('Rating must be between 0 and 10'),
    body('text').notEmpty().withMessage('Review text is required').isString(),
    body('date').notEmpty().withMessage('Date is required').isString(),
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
    reviewValidationRules,
    idValidationRule,
    checkValidationResult,
}
