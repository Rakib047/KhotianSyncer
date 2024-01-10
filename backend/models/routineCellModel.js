const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseTeacher: {
    type: String,
  },
  roomNumber: {
    type: String,
  },
  onlineLink: {
    type: String,
  },
  rowIndex: {
    type:String,
    required: true,
  },
  colIndex: {
    type:String,
    required: true,
  }
});

const RoutineCellModel = mongoose.model('RoutineCell', classSchema);

module.exports = RoutineCellModel;
