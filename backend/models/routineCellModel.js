const mongoose = require('mongoose');

const routineCellSchema = new mongoose.Schema({
  courseName: {
    type: String,
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
  },
  user_id: {
    type: String,
    required: true,
  },
});

const RoutineCellModel = mongoose.model('RoutineCell', routineCellSchema);

module.exports = RoutineCellModel;
