const express = require('express')

const {
    getMatches,
    addMatch,
    deleteMultipleMatches
} = require('../controllers/matchController')

// require auth for all tournaments route
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all matches
router.get('/', getMatches)
// POST a new match
router.post('/', addMatch)
// DELETE Multiple matches
router.delete('/', deleteMultipleMatches)


module.exports = router