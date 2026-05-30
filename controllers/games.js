const { ObjectId } = require('mongodb')
const mongodb = require('../db/connect')

const getGames = async (req, res, next) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('games')
            .find()

        const games = await result.toArray()
        res.status(200).json(games)
    } catch (err) {
        next(err)
    }
}

const getGameById = async (req, res, next) => {
    try {
        const gameId = new ObjectId(req.params.id)

        const result = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('games')
            .find({ _id: gameId })

        const game = await result.toArray()
        res.status(200).json(game)
    } catch (err) {
        next(err)
    }
}

const createGame = async (req, res, next) => {
    try {
        const game = {
            title: req.body.title,
            developer: req.body.developer,
            publisher: req.body.publisher,
            releaseDate: req.body.releaseDate,
            genre: req.body.genre,
            platform: req.body.platform,
            rating: req.body.rating,
            price: req.body.price,
            multiplayer: req.body.multiplayer,
        }

        const response = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('games')
            .insertOne(game)

        if (response.acknowledged) {
            res.status(201).json({
                id: response.insertedId,
            })
        } else {
            res.status(500).json({
                message: 'Error creating game',
            })
        }
    } catch (err) {
        next(err)
    }
}

const updateGame = async (req, res, next) => {
    try {
        const gameId = new ObjectId(req.params.id)

        const updatedGame = {
            title: req.body.title,
            developer: req.body.developer,
            publisher: req.body.publisher,
            releaseDate: req.body.releaseDate,
            genre: req.body.genre,
            platform: req.body.platform,
            rating: req.body.rating,
            price: req.body.price,
            multiplayer: req.body.multiplayer,
        }

        const response = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('games')
            .replaceOne({ _id: gameId }, updatedGame)

        if (response.modifiedCount > 0) {
            res.status(204).send()
        } else {
            res.status(500).json({
                message: 'Error updating game',
            })
        }
    } catch (err) {
        next(err)
    }
}

const deleteGame = async (req, res, next) => {
    try {
        const gameId = new ObjectId(req.params.id)

        const response = await mongodb
            .getDatabase()
            .db('cse341-game-library')
            .collection('games')
            .deleteOne({ _id: gameId })

        if (response.deletedCount > 0) {
            res.status(200).send()
        } else {
            res.status(500).json({
                message: 'Error deleting game',
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
}
