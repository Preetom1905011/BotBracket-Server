const mongoose = require("mongoose");
// const botSchema = require('./botModel');
// const matchSchema = require('./matchModel');

const Schema = mongoose.Schema;

// defines the structure of data
const tournamentSchema = new Schema(
  {
    name: { type: String, required: true },
    participantIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bot'}],
    matchIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
    user_id: { type: String, required: true},
    public: {type: Boolean, default: false}
  },
  { timestamps: true }
);

// automatically makes the collection
module.exports = mongoose.model('Tournament', tournamentSchema)