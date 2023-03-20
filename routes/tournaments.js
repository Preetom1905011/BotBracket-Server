const express = require('express')

const {
    loadTournament,
    addTournament,
    addParticipant,
    getParticipantsByTournament,
    deleteParticipantByTournament,
    addMatch,
    getMatchesByTournament,
    editTournament,
    deleteTournament
} = require('../controllers/tournamentController')

// require auth for all tournaments route
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all tournaments
router.get('/', loadTournament)
// POST a new tournament
router.post('/', addTournament)
// UPDATE a tournament
router.patch('/:id', editTournament)
// DELETE a tournament
router.delete('/:id', deleteTournament)
// POST a new participant to the tournament
router.post('/bots/:id', addParticipant)
// GET participants by a tournament
router.get('/bots/:id', getParticipantsByTournament)
// DELETE participant by tournament
router.delete('/bots/:id', deleteParticipantByTournament)
// POST a new match to the tournament
router.post('/matches/:id', addMatch)
// GET participants by a tournament
router.get('/matches/:id', getMatchesByTournament)


module.exports = router