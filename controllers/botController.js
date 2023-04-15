const Bot = require('../models/botModel')
const mongoose = require('mongoose')

// get all participants
const getBots = async (req, res) => {
    const user_id = req.user._id

    console.log(req.params)

    const bots = await Bot.find({user_id}).sort({chip: -1})

    res.status(200).json(bots)
}

// get a single participant
const getOneBot = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such bot"})
    }

    const bot = await Bot.findById(id)

    if (!bot){
        return res.status(404).json({error: "No such bot"})
    }

    res.status(200).json(bot)
}

// add a new participant
const addBot = async (req, res) => {
    const {title, chip, teamname, weightclass, signature} = req.body
    // add doc to db
    try {
        const user_id = req.user._id
        const bot = await Bot.create({title, chip, teamname, weightclass, signature, user_id})
        res.status(200).json(bot)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a participant
const deleteBot = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "INVALID ID"})
    }

    const bot = await Bot.findOneAndDelete({_id: id})

    if (!bot){
        return res.status(400).json({error: "No such bot"})
    }

    res.status(200).json(bot)

}

// update a participant
const updateBot = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid ID"})
    }
    const bot = await Bot.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!bot){
        return res.status(400).json({error: "No such bot"})
    }

    const updatedBot = await Bot.findOne({_id: id})
    res.status(200).json(updatedBot)
}

// delete multiple bots (called when tournament is deleted)
const deleteMultipleBots = async (req, res) => {
    const {participantIDs} = req.body

    const bots = []
        
    for (let i = 0; i < participantIDs.length; i++) {
        let id = participantIDs[i]
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "INVALID ID"})
        }

        const bot = await Bot.findOneAndDelete({_id: id})

        if (!bot){
            res.status(400).json({error: "No such bot"})
        }
        else {
            bots.push(bot)
        }

    }
    res.status(200).json(bots)

}

// for Viewer only
const getBotsNoAuth = async (req, res) => {
    const {id: user_id} = req.params

    const bots = await Bot.find({user_id}).sort({chip: -1})

    res.status(200).json(bots)
}


module.exports = {
    getBots,
    getOneBot,
    addBot,
    deleteBot,
    updateBot,
    deleteMultipleBots,
    getBotsNoAuth
}