const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  slideName: {
    type: String,
    required: true,
  },
  slideUrl : {
    type:String,
  }
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
