const mongoose = require("mongoose");

const AssignUserStorySchema = new mongoose.Schema({
    userStory_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId
});

const AssignUserStory = mongoose.model("Assigned", AssignUserStorySchema);

module.exports = AssignUserStory;