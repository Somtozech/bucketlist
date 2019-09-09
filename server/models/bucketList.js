const mongoose = require('mongoose');

const bucketListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Bucket List name is required'],
    index: true
  },
  items: [
    {
      name: { type: String, required: [true, 'Bucket List name is required'] },
      date_created: { type: Date, default: new Date() },
      date_modified: { type: Date, default: new Date() },
      done: { type: Boolean, default: false }
    }
  ],
  date_created: { type: Date, default: new Date() },
  date_modified: { type: Date, default: new Date() },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('BucketList', bucketListSchema);
