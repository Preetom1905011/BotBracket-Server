const express = require('express')

const {
    getMatches,
    addMatch,
    deleteMultipleMatches,
    getMatchesNoAuth
} = require('../controllers/matchController')

// require auth for all tournaments route
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireAuth)

// GET all matches FOR VIEWING ONLY
router.get('/User/:id', getMatchesNoAuth)
// GET all matches
router.get('/', requireAuth, getMatches)
// POST a new match
router.post('/', requireAuth, addMatch)
// DELETE Multiple matches
router.delete('/', requireAuth, deleteMultipleMatches)


module.exports = router