// comment model
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    quote: {type: String, required: true},
    username: {type: String, required: true},
    userid: {type: Object, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);