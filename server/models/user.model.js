// user model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // do i need to make id apart of the schema?
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

MediaSourceHandle.exports = mongoose.model('User', userSchema);