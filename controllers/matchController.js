const Match = require('../models/matchModel')

const mongoose = require('mongoose')

// get all matches
const getMatches = async (req, res) => {
    const user_id = req.user._id
    const matches = await Match.find({user_id}).sort({createdAt: -1})

    res.status(200).json(matches)
}

// add a new match
const addMatch = async (req, res) => {
    const {red, redScore, blue, blueScore} = req.body
    // add doc to db
    try {
        const user_id = req.user._id
        const match = await Match.create({red, redScore, blue, blueScore, user_id})
        res.status(200).json(match)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete multiple matches (called when tournament is deleted)
const deleteMultipleMatches = async (req, res) => {
    const {matchIDs} = req.body

    const matches = []
        
    for (let i = 0; i < matchIDs.length; i++) {
        let id = matchIDs[i]
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "INVALID ID"})
        }

        const match = await Match.findOneAndDelete({_id: id})

        if (!match){
            res.status(400).json({error: "No such match"})
        }
        else {
            matches.push(match)
        }

    }
    res.status(200).json(matches)

}

// for Viewer only
const getMatchesNoAuth = async (req, res) => {
    const {id: user_id} = req.params

    const matches = await Match.find({user_id}).sort({createdAt: -1})

    res.status(200).json(matches)
}

module.exports = {
    getMatches,
    addMatch,
    deleteMultipleMatches,
    getMatchesNoAuth
}