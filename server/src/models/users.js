const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
   username: { type: String, required: true },
   hash: { type: String, required: true },
   parts: [{ type: ObjectId, ref: 'parts' }],
   packages: [{type: ObjectId, ref: 'packages' }],
});

module.exports = mongoose.model('users', userSchema);
