const express = require('express')
const SelectedTM = require('../models/selectedTMModel')

const mongoose = require('mongoose')


// add selected tournament Doc (ONLY When A New User Signs Up)
const addSelectedTM = async (req, res) => {
    const {_id} = req.body
    const TMID = new mongoose.Types.ObjectId()
    try {
        const selectedTM = await SelectedTM.create({TMID: TMID, user_id: _id})
        res.status(200).json(selectedTM)
    } catch (error) {
        res.status(400).json(error)
    }
}

// load selected tournament
const loadSelectedTM = async (req, res) => {
    const user_id = req.user._id
    const selected = await SelectedTM.find({user_id}).populate({path: 'TMID', select: ['name']})
    const {TMID} = selected[0]

    res.status(200).json(TMID)
}
// update selected tournament
const updateSelectedTM = async (req, res) => {
    const {_id} = req.body
    const user_id = req.user._id
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: "Invalid ID"})
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(404).json({error: "Invalid User"})
    }

    const selected = await SelectedTM.findOneAndUpdate({user_id: user_id}, {
        TMID: _id
    })

    if (!selected){
        return res.status(400).json({error: "Not selected"})
    }

    const newSelected = await SelectedTM.find({user_id: user_id}).populate({path: 'TMID', select: ['name']})
    const {TMID} = newSelected[0]
    res.status(200).json(TMID)

}

// require auth for all tournaments route
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET the selected tournament
router.get('/', loadSelectedTM)
// POST new selected tournament doc when sign up
router.post('/', addSelectedTM)
// UPDATE the selected tournament
router.patch('/', updateSelectedTM)


module.exports = router