const mongoose = require("mongoose")

const Schema = mongoose.Schema
const PostSchema = new Schema({
    url: String,
    header: String,
    content: String,
    image_path: String,
    date: String,
    category: String,
    author: String,
    post_tags: Array,
})

module.exports = mongoose.model('post', PostSchema)