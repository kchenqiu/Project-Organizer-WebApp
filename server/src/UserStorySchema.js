const mongoose = require("mongoose");

const UserStorySchema = new mongoose.Schema({
    UserStory: String,
    proj_id: mongoose.Schema.Types.ObjectId,
    priority: String
});

const UserStory = mongoose.model("UserStory", UserStorySchema);

module.exports = UserStory;