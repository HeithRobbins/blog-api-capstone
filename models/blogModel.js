const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Blog = new Schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("blogs", Blog);