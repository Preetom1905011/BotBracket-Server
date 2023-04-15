const express = require('express')

const {
    getBots,
    getOneBot,
    addBot,
    deleteBot,
    updateBot,
    deleteMultipleBots,
    getBotsNoAuth
} = require('../controllers/botController')

// require auth for all tournaments route
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireAuth)

// GET all participants FOR VIEWING ONLY
router.get('/User/:id', getBotsNoAuth)

// GET all participants
router.get('/', requireAuth, getBots)

// GET a single participant
router.get('/:id', requireAuth, getOneBot)

// POST a new participants
router.post('/', requireAuth, addBot)

// DELETE a new participants
router.delete('/:id', requireAuth, deleteBot)

// DELETE multiple participants
router.delete('/', requireAuth, deleteMultipleBots)

// UPDATE a new participants
router.patch('/:id', requireAuth, updateBot)

module.exports = router
