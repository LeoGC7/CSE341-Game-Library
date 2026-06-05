const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/')
    }
)

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: {
                id: req.user.id,
                username: req.user.username,
                displayName: req.user.displayName,
            },
        })
    } else {
        res.json({ authenticated: false })
    }
})

module.exports = router
