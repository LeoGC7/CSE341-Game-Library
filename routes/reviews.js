const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/reviews')
const {
    reviewValidationRules,
    idValidationRule,
    checkValidationResult,
} = require('../validators/reviews')

router.get('/', reviewsController.getReviews)
router.get('/:id', idValidationRule, checkValidationResult, reviewsController.getReviewById)
router.post('/', reviewValidationRules, checkValidationResult, reviewsController.createReview)
router.put(
    '/:id',
    idValidationRule,
    reviewValidationRules,
    checkValidationResult,
    reviewsController.updateReview
)
router.delete('/:id', idValidationRule, checkValidationResult, reviewsController.deleteReview)

module.exports = router
