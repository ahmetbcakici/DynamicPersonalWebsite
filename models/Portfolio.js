const mongoose = require("mongoose")

const Schema = mongoose.Schema
const PortfolioSchema = new Schema({
    image_path: String,
    header: String,
    description: String,
    ref_link : String,
    type: String,
})

module.exports = mongoose.model('portfolio_item', PortfolioSchema)