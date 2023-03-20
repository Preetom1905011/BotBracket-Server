const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchSchema = new Schema(
    {
        red: {type: String, required: true},
        redScore: {type: String, required: true},
        blue: {type: String, required: true},
        blueScore: {type: String, required: true},
        user_id: { type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Match", matchSchema)