const mongoose = require("mongoose")

const characterSchema = new mongoose.Schema({
    name: String,
    alias: String,
    abilities: String,
    whereTheyreFrom: String,
    picture: String
})

const Character = mongoose.model("Character", characterSchema)

module.exports = Character