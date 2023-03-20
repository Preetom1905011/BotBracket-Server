const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defines the structure of data
const botSchema = new Schema(
  {
    title: { type: String, required: true },
    chip: { type: Number, required: true },
    teamname: { type: String, required: true },
    weightclass: { type: String, required: true },
    signature: { type: String, required: true },
    user_id: { type: String, required: true}
  },
  { timestamps: true }
);

// automatically makes the collection
module.exports = mongoose.model('Bot', botSchema)