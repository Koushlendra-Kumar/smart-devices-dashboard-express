const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  alloted_to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  state: {
    light: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    fan: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    mis: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
