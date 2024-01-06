const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    required: true,
  },

  links: [
    {
      title: {
        type: String,
        required: true,
      },
      semester: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
  
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
