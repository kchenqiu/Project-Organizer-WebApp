const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    Username: String,
    Password: String
});

const User = mongoose.model("user", UserSchema);

module.exports = User;