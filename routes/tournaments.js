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
    deleteTournament,
    getPublicTournaments
} = require('../controllers/tournamentController')

// require auth for all tournaments route
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireAuth)

// GET all tournaments
router.get('/', requireAuth, loadTournament)
// POST a new tournament
router.post('/', requireAuth, addTournament)
// UPDATE a tournament
router.patch('/:id', requireAuth, editTournament)
// DELETE a tournament
router.delete('/:id', requireAuth, deleteTournament)
// POST a new participant to the tournament
router.post('/bots/:id', requireAuth, addParticipant)
// GET participants by a tournament
router.get('/bots/:id', requireAuth, getParticipantsByTournament)
// DELETE participant by tournament
router.delete('/bots/:id', requireAuth, deleteParticipantByTournament)
// POST a new match to the tournament
router.post('/matches/:id', requireAuth, addMatch)
// GET participants by a tournament
router.get('/matches/:id', requireAuth, getMatchesByTournament)

// For Viewing Only
// GET public tournaments of users
router.get('/Users/:id', getPublicTournaments)


module.exports = router