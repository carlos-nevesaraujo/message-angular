var mongoose = require('mongoose')
var Schema = mongoose.Schema

const schema = new Schema({
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String }
})

module.exports = mongoose.model('Message', schema)