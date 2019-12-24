const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Category', Schema);
