const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    age: { type: Number, min: 20, max: 90, required: true },
    content: String
})

module.exports = mongoose.model("Post", schema)