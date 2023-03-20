const Tournament = require('../models/tournamentModel')

const mongoose = require('mongoose')

// load tournament
const loadTournament = async (req, res) => {
    const user_id = req.user._id
    const tournament = await Tournament.find({user_id}, {name: 1}).sort({createdAt: -1})

    res.status(200).json(tournament)

}

// add tournament
const addTournament = async (req, res) => {
    const {name, participantIDs, matchIDs} = req.body
    // add doc to db
    try {
        const user_id = req.user._id
        const tournament = await Tournament.create({name, participantIDs, matchIDs, user_id})
        res.status(200).json(tournament)
    }
    catch(error) {
        console.log("error occured")
        res.status(400).json({error: error.message})
    }
}

// add participant
const addParticipant = async (req, res) => {
    try {
        // tournament id
        const {id} = req.params
        // participant id
        const {_id} = req.body

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid tournament ID"})
        }
        console.log(_id)

        if (!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({error: "Invalid participant ID"})
        }

        const {participantIDs} = await Tournament.findOne({_id: id})
        const tournament = await Tournament.findOneAndUpdate({_id: id}, {
            participantIDs: [...participantIDs, _id]
        })

        res.status(200).json(tournament)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

// get participants by tournament
const getParticipantsByTournament = async (req, res) => {
    try {
        // tournament id
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid tournament ID"})
        }

        const participants = await Tournament.find({_id: id}).populate('participantIDs')

        res.status(200).json(participants[0].participantIDs)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}


// delete participants
const deleteParticipantByTournament = async (req, res) => {
    try {
        // tournament id
        const {id} = req.params
        // participant ID
        const {_id} = req.body
        
        const {participantIDs} = await Tournament.findOne({_id: id})
        const tournament = await Tournament.findOneAndUpdate({_id: id}, {
            participantIDs: participantIDs.filter((ID) => String(ID) !== _id)
        })

        res.status(200).json(tournament)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}
// Add match - update tournament
const addMatch = async (req, res) => {
    try {
        // tournament id
        const {id} = req.params
        // participant id
        const {_id} = req.body

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid tournament ID"})
        }
        console.log(_id)

        if (!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({error: "Invalid Match ID"})
        }

        const {matchIDs} = await Tournament.findOne({_id: id})
        const tournament = await Tournament.findOneAndUpdate({_id: id}, {
            matchIDs: [...matchIDs, _id]
        })

        res.status(200).json(tournament)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}
// get all matches by tournament ID
const getMatchesByTournament = async (req, res) => {
    try {
        // tournament id
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Invalid tournament ID"})
        }

        const matches = await Tournament.find({_id: id}).populate('matchIDs')

        res.status(200).json(matches[0].matchIDs.reverse())
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}
// Update/Edit the tournament name
const editTournament = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid ID"})
    }
    const tournament = await Tournament.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!tournament){
        return res.status(400).json({error: "No such tournament"})
    }

    const updatedTournament = await Tournament.findOne({_id: id})
    res.status(200).json(updatedTournament)

}
// DELETE a tournament
const deleteTournament = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "INVALID ID"})
    }

    const tournament = await Tournament.findOneAndDelete({_id: id})

    if (!tournament){
        return res.status(400).json({error: "No such tournament"})
    }

    res.status(200).json(tournament)
}

module.exports = {
    loadTournament,
    addTournament,
    addParticipant,
    getParticipantsByTournament,
    deleteParticipantByTournament,
    addMatch,
    getMatchesByTournament,
    editTournament,
    deleteTournament
}