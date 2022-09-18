const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now() },
    archiveDate: { type: Date, default: undefined },
}, { versionKey: false }); //Disabled versionKey (__v field)

module.exports = {NewModel: mongoose.model("New", newSchema)}