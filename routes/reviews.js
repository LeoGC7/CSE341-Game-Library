const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/reviews')
const {
    reviewValidationRules,
    idValidationRule,
    checkValidationResult,
} = require('../validators/reviews')
const { isAuthenticated } = require('../middleware/auth')

router.get('/', reviewsController.getReviews)
router.get('/:id', idValidationRule, checkValidationResult, reviewsController.getReviewById)
router.post(
    '/',
    /*  #swagger.security = [{ "cookieAuth": [] }] */
    isAuthenticated,
    reviewValidationRules,
    checkValidationResult,
    reviewsController.createReview
)
router.put(
    '/:id',
    /*  #swagger.security = [{ "cookieAuth": [] }] */
    isAuthenticated,
    idValidationRule,
    reviewValidationRules,
    checkValidationResult,
    reviewsController.updateReview
)
router.delete(
    '/:id',
    /*  #swagger.security = [{ "cookieAuth": [] }] */
    isAuthenticated,
    idValidationRule,
    checkValidationResult,
    reviewsController.deleteReview
)

module.exports = router
