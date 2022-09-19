const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    jwt: String,
    creationDate: { type: Date, default: Date.now() },
}, { versionKey: false }); //Disabled versionKey (__v field)

module.exports = {UserModel: mongoose.model("User", newSchema)}