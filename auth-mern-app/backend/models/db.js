const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
});

const UserModel = mongoose.model("users", Users);

module.exports = {
    UserModel,
}