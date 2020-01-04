const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ExperienceSchema = new Schema({
    header: String,
    date: String,
    place: String,
    description: String,
    category: String
})

module.exports = mongoose.model('experience', ExperienceSchema)