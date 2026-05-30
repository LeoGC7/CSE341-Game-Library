const { ObjectId } = require('mongodb')
const mongodb = require('../db/connect')

const getReviews = async (req, res, next) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('reviews')
            .find()

        const reviews = await result.toArray()
        res.status(200).json(reviews)
    } catch (err) {
        next(err)
    }
}

const getReviewById = async (req, res, next) => {
    try {
        const reviewId = new ObjectId(req.params.id)

        const result = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('reviews')
            .find({ _id: reviewId })

        const review = await result.toArray()
        res.status(200).json(review)
    } catch (err) {
        next(err)
    }
}

const createReview = async (req, res, next) => {
    try {
        const review = {
            gameId: req.body.gameId,
            author: req.body.author,
            rating: req.body.rating,
            text: req.body.text,
            date: req.body.date,
        }

        const response = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('reviews')
            .insertOne(review)

        if (response.acknowledged) {
            res.status(201).json({
                id: response.insertedId,
            })
        } else {
            res.status(500).json({
                message: 'Error creating review',
            })
        }
    } catch (err) {
        next(err)
    }
}

const updateReview = async (req, res, next) => {
    try {
        const reviewId = new ObjectId(req.params.id)

        const updatedReview = {
            gameId: req.body.gameId,
            author: req.body.author,
            rating: req.body.rating,
            text: req.body.text,
            date: req.body.date,
        }

        const response = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('reviews')
            .replaceOne({ _id: reviewId }, updatedReview)

        if (response.modifiedCount > 0) {
            res.status(204).send()
        } else {
            res.status(500).json({
                message: 'Error updating review',
            })
        }
    } catch (err) {
        next(err)
    }
}

const deleteReview = async (req, res, next) => {
    try {
        const reviewId = new ObjectId(req.params.id)

        const response = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('reviews')
            .deleteOne({ _id: reviewId })

        if (response.deletedCount > 0) {
            res.status(200).send()
        } else {
            res.status(500).json({
                message: 'Error deleting review',
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
}
