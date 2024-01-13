const mongoose = require('mongoose');

const termFinalSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  termFinalFileName: {
    type: String,
    required: true,
  },
  termFinalUrl : {
    type:String,
  }
});

const termFinalModel = mongoose.model('TermFinal', termFinalSchema);

module.exports = termFinalModel;
