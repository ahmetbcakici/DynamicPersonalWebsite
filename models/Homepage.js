const mongoose = require("mongoose")

const Schema = mongoose.Schema
const HomePageSchema = new Schema({
    site_title:String,
    avatar_path: String,
    name: String,
    title: String,
    about: String,
    country: String,
    mail_address: String,
    phone_number: String,
    social_icons: Object,
    site_icon:String
})

module.exports = mongoose.model('homepage_field', HomePageSchema)