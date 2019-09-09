const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, expires: '5h', default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);
