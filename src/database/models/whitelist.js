const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Guild: String,
    Type: String,
});

module.exports = mongoose.model("whitelist", Schema);