const RoutineCellModel = require("../models/routineCellModel");
const routineCellModel = require("../models/routineCellModel");

const saveCell = async (req, res) => {
  try {
    const { courseName, courseTeacher, roomNumber, onlineLink,rowIndex,colIndex } = req.body;
    const user_id = req.userProperty._id;

    const newCell = new routineCellModel({
      courseName,
      courseTeacher,
      roomNumber,
      onlineLink,
      rowIndex,
      colIndex,
      user_id,
    });

    const savedCell = await newCell.save();
    res.status(200).json(savedCell);
  } catch (err) {
    console.error("Error saving class:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCell = async (req, res) => {
  const { id } = req.params;
  const user_id = req.userProperty._id;

  try {
    const updatedCell = await RoutineCellModel.findOneAndUpdate(
      { _id: id, user_id },
      req.body,
      { new: true }
    );

    if (!updatedCell) {
      return res.status(404).json({ error: "Cell not found or unauthorized" });
    }

    res.json(updatedCell);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

const getCell = async (req, res) => {
  const { rowIndex, colIndex } = req.params;
  const user_id = req.userProperty._id;

  try {
    const foundCell = await routineCellModel.findOne({
      rowIndex,
      colIndex,
      user_id,
    });

    if (!foundCell) {
      return res.status(404).json({ error: "Class not found or unauthorized" });
    }

    res.json(foundCell);
  } catch (err) {
    console.error("Error fetching class:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { saveCell, updateCell, getCell };
