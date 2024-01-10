const RoutineCellModel = require("../models/routineCellModel");
const routineCellModel = require("../models/routineCellModel");

const saveCell = async (req, res) => {
  try {
    const newCell = new routineCellModel(req.body);
    const savedCell = await newCell.save();
    res.status(200).json(savedCell);
  } catch (err) {
    console.error("Error saving class:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCell = async (req, res) => {
    const { id } = req.params;

    try {
      const updatedCell = await RoutineCellModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedCell);
    } catch (error) {
      console.error('Error updating class:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
};

const getCell = async (req, res) => {
  const { rowIndex,colIndex } = req.params;

  try {
    const foundCell = await routineCellModel.findOne({ rowIndex, colIndex });

    if (!foundCell) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json(foundCell);
  } catch (err) {
    console.error("Error fetching class:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { saveCell, updateCell, getCell };
