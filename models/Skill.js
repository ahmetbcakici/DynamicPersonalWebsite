const mongoose = require("mongoose")

const Schema = mongoose.Schema
const SkillSchema = new Schema({
    name: String,
    percent: String,
    category: String
})

module.exports = mongoose.model('skill', SkillSchema)