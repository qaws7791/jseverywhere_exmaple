const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            index: { unique: true }
        },
        email: {
            type: String,
            require: true,
            index: { unique: true }
        },
        password: {
            type: String,
            require: true
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;